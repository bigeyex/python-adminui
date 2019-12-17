import uuid
from flask import Flask, jsonify, request
from werkzeug.routing import BaseConverter
from .page import Page

class CallbackRegistryType:
    uuid_callback_map = {}
    callback_uuid_map = {}
    def uuid_for_callback(self, callback):
        if callback in self.callback_uuid_map:
            return self.callback_uuid_map[callback]
        else:
            cb_uuid = str(uuid.uuid1())
            self.uuid_callback_map[cb_uuid] = callback
            self.callback_uuid_map[callback] = cb_uuid
            return cb_uuid
    def make_callback(self, uuid, args):
        if uuid in self.uuid_callback_map:
            return self.uuid_callback_map[uuid](*args)
        else:
            # TODO: Return an error to the frontend
            return None

callbackRegistry = CallbackRegistryType()

class PurePathConverter(BaseConverter):
    regex = r'[a-zA-Z0-9\/]+'

class MenuItem(Element):
    def __init__(self, name, url='', children=[]):
        super().__init__(name=name, url=url, children=children)
        self.components_fields = ['children']

class AdminApp:
    def __init__(self):
        self.app = Flask(__name__, static_url_path='/')
        self.app.url_map.converters['purePath'] = PurePathConverter 
        self.pages = {}

    def page(self, url, name):
        def decorator(func):
            self.pages[url] = Page(url, name, content=func())
        return decorator
    
    def add_menu()
    
    def serve_page(self, url=''):
        url = '/'+url
        if url in self.pages:
            return jsonify(self.pages[url].as_list())
        else:
            return 'error'

    def handle_page_action(self):
        msg = request.get_json()
        response = callbackRegistry.make_callback(msg['cb_uuid'], msg['args'])
        if response is not None:
            return response.as_dict()
        else:
            return 'error'

    def serve_menu(self):
        return jsonify([])

    def serve_root(self, path=''):
        return self.app.send_static_file('index.html')
    
    def mock_current_user(self):
        return jsonify({
            'name': 'Serati Ma'
        })

    def run(self):
        self.app.route('/api/page_layout/<url>')(self.serve_page)
        self.app.route('/api/page_layout/<url>/')(self.serve_page)
        self.app.route('/api/page_layout/')(self.serve_page)
        self.app.route('/api/currentUser')(self.mock_current_user)
        self.app.route('/api/main_menu')(self.serve_menu)
        self.app.route('/api/page_action', methods=['POST'])(self.handle_page_action)
        self.app.route('/')(self.serve_root)
        self.app.route('/<purePath:path>/')(self.serve_root)
        self.app.run()