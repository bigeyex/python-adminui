from distutils.command.upload import upload
import uuid
import jwt
import inspect
import os
import time
from pathlib import Path
from inspect import signature
from .page import Page
from .element import Element

class CallbackRegistryType:
    uuid_callback_map = {}
    callback_uuid_map = {}
    def uuid_for_callback(self, callback):
        if callback is None:
            return None
        if callback in self.callback_uuid_map:
            return self.callback_uuid_map[callback]
        else:
            cb_uuid = str(uuid.uuid1())
            self.uuid_callback_map[cb_uuid] = callback
            self.callback_uuid_map[callback] = cb_uuid
            return cb_uuid
    def make_callback(self, uuid, args):
        if uuid in self.uuid_callback_map:
            method = self.uuid_callback_map[uuid]
            param_length = len(signature(method).parameters)
            return method(*args[:param_length])
        else:
            # TODO: Return an error to the frontend
            return None

callbackRegistry = CallbackRegistryType()

class MenuItem(Element):
    """Represents a menu item
    
        Args:
            name (str): the title of the menu
            url (str, optional): the url the menu will navigate to. Defaults to ''.
            icon (str, optional): the icon of the menu. See https://ant.design/components/icon/. Defaults to None.
            auth_needed (str, optional): the permission needed for user to access this page. e.g. 'user' or 'admin'
            children (list, optional): set this if the menu has a sub-menu. Defaults to [].
    """
    def __init__(self, name, url='', icon=None, auth_needed=None, children=[]):
        self.name = name
        self.url = url
        self.icon = icon
        self.auth_needed = auth_needed
        self.children = children
    def has_auth(self, auth=[]):
        if self.auth_needed is None or self.auth_needed in auth:
            return True
        else:
            return False
    def as_dict(self, auth=[]):
        return {
            'name': self.name,
            'path': self.url,
            'icon': self.icon,
            'component': './index',
            'children': [x.as_dict(auth) for x in self.children if x.has_auth(auth)]
        }

DEFAULT_AVATAR = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
class LoggedInUser(Element):
    """Returned by login handler, represent a successfully logged in user.
    
    Args:
        display_name: the display name of the user
        auth: a list of permission string the user have. Will be checked against in pages or menus
        avatar: the avatar of the user
        user_info: info for future use, accessible by app.current_user()['user_info']
    """
    def __init__(self, display_name='', auth=['user'], avatar=DEFAULT_AVATAR, user_info=None, redirect_to=None):
        token = jwt.encode({
            "display_name": display_name,
            "auth": auth,
            "user_info": user_info
        }, AdminApp.SECRET, algorithm='HS256')
        super().__init__('LoginAndNavigateTo', status='ok', display_name=display_name, avatar=avatar, redirect_to=redirect_to, token=token)

class LoginFailed(Element):
    """Returned by login handler, represent a failed login attempt
    
    Args:
        title: the title shown in the error message. default: 'Login Failed'
        message: the error message content. default: 'Username or password is incorrect'
    """
    def __init__(self, title="Login Failed", message="Username or password is incorrect"):
        super().__init__('LoginFailed', status='error', error=message, title=title)

class ErrorResponse(Element):
    def __init__(self, title="Something Got Wrong", message="You encountered an Error", error_type="error"):
        super().__init__('Error', status='error', message=message, title=title, error_type=error_type)

class AdminApp:
    SECRET = "admin ui super &*#*$ secret"
    """Create an AdminUI App"""
    def __init__(self, upload_folder=None, use_fastapi=False):
        self.app_title = 'Admin UI App'
        self.copyright_text = 'Professional UI with Python'
        self.footer_links = {'Github': 'https://github.com/bigeyex/python-adminui', 'Ant Design': 'https://ant.design'}
        self.app_logo = None
        self.app_styles = {'nav_theme': 'dark', 'layout': 'sidemenu'}
        self.static_files = {} # format: {'path_name': absolute_file_path}
        if upload_folder is None:
            # the upload folder is not defined. using the main_module_path/upload as the folder
            frame = inspect.stack()[1]
            module = inspect.getmodule(frame[0])
            upload_folder = os.path.join(os.path.dirname(os.path.abspath(module.__file__)), 'upload')
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
        self.upload_folder = upload_folder
        self.pages = {}
        self.menu = []
        self.on_login = {}
        self.use_fastapi = use_fastapi
        if use_fastapi:
            self.init_fastapi_app()
        else:
            self.init_flask_app()

    def page(self, url, name, auth_needed=None):
        """Decorator: register a AdminUI Page
        
        Args:
            url (str): the url of the page. e.g. '/', '/detail', '/user/new'.
                You may have at most 2 levels. 
            name (str): the title of the page
            auth_needed: an array of required auth permissions. e.g. ['user']
        
        Example: 
            @app.page('/detail', 'Detail Page', ['user'])
            def detail_page(arg): 
                # additional url parameters will be passed here
                # if you declare '/details' and user visits '/details/2', 2 will be passed here
                return [ ...Elements of the page... ]
        """
        def decorator(func):
            self.pages[url] = Page(url, name, builder=func, auth_needed=auth_needed)
        return decorator

    def login(self, method='password'):
        """Decorator: register a login handler
        """
        def decorator(func):
            self.on_login[method] = func
        return decorator
    
    def set_menu(self, menu):
        """Setup the menu of the website. If not called, no menu will be shown
        
        Args:
            menu (MenuItem[]): A list of MenuItem objects.
        """
        self.menu = menu

    def current_user(self, request=None):
        """Get the current logged in user. 
        
        Returns:
            {'display_name', 'auth', 'user_info'}: information about current logged in user
        """
        auth_header = self.get_header('Authorization', request)
        if auth_header is not None:
            return jwt.decode(bytes(auth_header, 'utf-8'), AdminApp.SECRET, algorithms=['HS256'])
        else:
            return {'display_name': None, 'auth': [], 'user_info': None}
    
    async def serve_page(self, url='', request=None):
        """!!! Private method, don't call. Serve the page specifications
        
        Args:
            url (str, optional): The url pattern of the page.
        """
        def has_permission(page):
            return page.auth_needed is None or page.auth_needed in self.current_user(request)['auth']

        url_parts = url.split('/')
        full_url = '/'+url
        base_url = '/'+url_parts[0]
        if self.use_fastapi:
            args = self.get_url_args(request)
        else:
            args = self.get_url_args(request)
        if full_url in self.pages:
            if has_permission(self.pages[full_url]):
                return self.jsonify(self.pages[full_url].as_list(all_params=args))
            else: 
                return ErrorResponse("No Permission", "Please login first or contact your administrator", "403").as_dict()
        elif base_url in self.pages and len(url_parts)>1:
            if has_permission(self.pages[base_url]):
                return self.jsonify(self.pages[base_url].as_list(url_parts[1], all_params=args))
            else:
                return ErrorResponse("No Permission", "Please login first or contact your administrator", "403").as_dict()
        else:
            return ErrorResponse("Page not Found", error_type="404").as_dict()

    async def handle_page_action(self, request=None):
        """!!! Private method, don't call. Manage user actions like button clicks
            handles /api/page_action
        """
        if self.use_fastapi:
            msg = await self.get_request_json(request)
        else:
            msg = self.get_request_json(request)
        if 'args' not in msg:
            msg['args'] = []
        response = callbackRegistry.make_callback(msg['cb_uuid'], msg['args'])
        if response is not None:
            return self.jsonify(response)
        else:
            return ErrorResponse("No Action", error_type="204").as_dict()

    async def handle_login_action(self, request=None):
        """!!! Private method, don't call. Manage user actions like button clicks
            handles /api/login
        """
        if self.use_fastapi:
            msg = await self.get_request_json(request)
        else:
            msg = self.get_request_json(request)
        if 'password' in self.on_login:
            return self.on_login['password'](msg['username'], msg['password']).as_dict()
        else:
            return ErrorResponse("Login type not supported", error_type="501").as_dict()

    def serve_menu(self, request=None):
        """!!! Private method, don't call. Serve the menu to the frontend"""
        token = self.current_user(request)
        return self.jsonify({
            'menu': [x.as_dict() for x in self.menu if x.has_auth(token['auth'])]
        })

    def serve_settings(self):
        """Serve settings like logo and title"""
        return self.jsonify({'title':self.app_title, 'appLogo':self.app_logo, 'copyrightText':self.copyright_text, 'footerLinks': self.footer_links,
                    'navTheme': self.app_styles['nav_theme'], 'layout': self.app_styles['layout']})

    def serve_root(self, path=''):
        """!!! Private method, don't call. Serve the index.html"""
        return self.app.send_static_file('index.html')
    
    def serve_upload_flask(self):
        """!!! Private method, don't call. Serve the upload endpoint"""
        from flask import request
        from werkzeug.utils import secure_filename
        f = next(request.files.values())
        Path(self.app.config['UPLOAD_FOLDER']).mkdir(parents=True, exist_ok=True) # create dir if not exist
        filename = str(int(time.time() * 1000)) + '_' + secure_filename(f.filename) # create unique filename with timestamp prefix
        f.save(os.path.join(self.app.config['UPLOAD_FOLDER'], filename))
        return filename

    def uploaded_file_name(self, uploaded_file):
        if 'file_name' in uploaded_file:
            return uploaded_file['file_name']
        elif 'response' in uploaded_file:
            return uploaded_file['response']
        elif 'file' in uploaded_file:
            return self.uploaded_file_name(uploaded_file['file'])
        else:
            return None

    def uploaded_file_location(self, uploaded_file):
        return os.path.join(self.upload_folder, self.uploaded_file_name(uploaded_file))

    def run(self,*args, **kwargs):
        """run the AdminUI App"""
        self.prepare().run(*args, **kwargs)

    def prepare(self):
        """do the prepare work and return the flask app"""
        if self.use_fastapi:
            self.prepare_fastapi_app()
        else:
            self.prepare_flask_app()
        return self.app

    def init_flask_app(self):
        from flask import Flask, jsonify, request
        from flask.json import JSONEncoder
        from werkzeug.routing import BaseConverter
        class PurePathConverter(BaseConverter):
            regex = r'[a-zA-Z0-9\/]+'
        # element serializer
        class ElementJSONEncoder(JSONEncoder):
            def default(self, obj):
                if isinstance(obj, Element):
                    return obj.as_dict()
        self.jsonify = jsonify
        self.get_request_json = lambda _request: request.get_json()
        self.get_url_args = lambda _request: request.args.to_dict()
        self.get_header = lambda n, _request:request.headers.get(n)
        self.app = Flask(__name__, static_url_path='/')
        self.app.json_encoder = ElementJSONEncoder
        self.app.url_map.converters['purePath'] = PurePathConverter 
        self.app.config['UPLOAD_FOLDER'] = self.upload_folder

    def prepare_flask_app(self):
        from flask import send_from_directory
        for path_name, file_path in self.static_files.items():
            self.app.route(f'{path_name}/<path:path>')(lambda path: send_from_directory(file_path, path))
        self.app.route('/api/page_layout/<path:url>/')(self.serve_page)
        self.app.route('/api/page_layout/')(self.serve_page)
        self.app.route('/api/main_menu')(self.serve_menu)
        self.app.route('/api/app_settings')(self.serve_settings)
        self.app.route('/api/login', methods=['POST'])(self.handle_login_action)
        self.app.route('/api/upload', methods=['POST'])(self.serve_upload_flask)
        self.app.route('/api/page_action', methods=['POST'])(self.handle_page_action)
        self.app.route('/')(self.serve_root)
        self.app.route('/<purePath:path>/')(self.serve_root)

    def init_fastapi_app(self):
        from fastapi import FastAPI
        import json
        from fastapi.responses import Response
        class ElementJSONEncoder(json.JSONEncoder):
            def default(self, obj):
                if isinstance(obj, Element):
                    return obj.as_dict()
        # custom Element Json encoder is needed to process adminui's json content
        self.jsonify = lambda x:Response(content=json.dumps(x, cls=ElementJSONEncoder), media_type='application/json')
        async def get_request_json_method(request):
            return await request.json()
        self.get_request_json = get_request_json_method
        self.get_header = lambda name, request:request.headers[name] if name in request.headers else None
        self.get_url_args = lambda request: request.query_params._dict
        self.app = FastAPI()

    def prepare_fastapi_app(self):
        from fastapi import Request
        from fastapi.staticfiles import StaticFiles
        from fastapi import FastAPI, File, UploadFile
        import shutil
        from starlette.responses import FileResponse 
        from starlette.exceptions import HTTPException as StarletteHTTPException

        @self.app.get('/api/page_layout/{page_path:path}')
        async def get_page_layout(page_path:str, request:Request):
            return await self.serve_page(page_path, request)
        @self.app.get('/api/main_menu')
        def get_main_menu(request:Request):
            return self.serve_menu(request)
        @self.app.get('/api/app_settings')
        def get_app_settings():
            return self.serve_settings()
        @self.app.post("/api/upload")
        async def post_upload(upload: UploadFile):
            with open(os.path.join(self.upload_folder, upload.filename), 'wb') as buffer:
                shutil.copyfileobj(upload.file, buffer)
            return upload.filename
        @self.app.post('/api/login')
        async def post_login_action(request:Request):
            return await self.handle_login_action(request)
        @self.app.post('/api/page_action')
        async def post_page_action(request:Request):
            return await self.handle_page_action(request)
        for path_name, file_path in self.static_files.items():
            self.app.mount(path_name, StaticFiles(directory=file_path, html=True), name=path_name)
        self.app.mount("/", StaticFiles(directory=os.path.join(Path(__file__).parent.absolute(), "static"), html=True), name="static")
        @self.app.exception_handler(StarletteHTTPException)     # to catch path like '/user/login', redirect to index.html, frontend will handle path there
        async def custom_http_exception_handler(request, exc):
            print(exc)
            return FileResponse(os.path.join(Path(__file__).parent.absolute(), "static", "index.html"))
            