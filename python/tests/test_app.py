from adminui import AdminApp, Page, LoggedInUser, LoginFailed, callbackRegistry, MenuItem, NavigateTo

import pytest
import jwt
import json

@pytest.fixture
def adminapp():
    app = AdminApp()
    app.app.config['TESTING'] = True
    app.prepare()
    return app

def test_page(adminapp):
    @adminapp.page('/', 'testpage')
    def testpage():
        return []
    print(adminapp.pages['/'].as_list())
    assert type(adminapp.pages['/']) is Page
    assert adminapp.pages['/'].name == 'testpage'

def test_login(adminapp):
    @adminapp.login()
    def on_login():
        return 'done'
    assert adminapp.on_login['password']() == 'done'

def test_set_menu(adminapp):
    adminapp.set_menu([])
    assert adminapp.menu == []

def test_current_user(adminapp):
    user = LoggedInUser('username')
    token = jwt.encode({
            "display_name": 'username',
            "auth": ['user'],
            "user_info": 'extra info'
        }, AdminApp.SECRET, algorithm='HS256')
    @adminapp.page('/', 'testpage')
    def testpage():
        return []
    with adminapp.app.test_client() as client:
        client.get('/')
        assert adminapp.current_user() == {'display_name': None, 'auth': [], 'user_info': None}
        client.get('/', headers = {'Authorization': token})
        assert adminapp.current_user() == {
            "display_name": 'username',
            "auth": ['user'],
            "user_info": 'extra info'
        }
def test_serve_page(adminapp):
    token = jwt.encode({
            "display_name": 'username',
            "auth": ['user'],
            "user_info": 'extra info'
        }, AdminApp.SECRET, algorithm='HS256')
    @adminapp.page('/base', 'testpage', auth_needed='user')
    def testpage():
        return []
    @adminapp.page('/parambase', 'testpage', auth_needed='user')
    def testpage(param):
        return [param]
    with adminapp.app.test_client() as client:
        # full url without permission
        response = client.get('/api/page_layout/base', follow_redirects=True)
        assert json.loads(response.data)['error_type'] == '403'
        # full url with permission
        response = client.get('/api/page_layout/base', headers = {'Authorization': token}, follow_redirects=True)
        assert json.loads(response.data)['content'] == []
        # base url with permission
        response = client.get('/api/page_layout/parambase/param1', headers = {'Authorization': token}, follow_redirects=True)
        assert json.loads(response.data)['content'] == ['param1']
        # base url without permission
        response = client.get('/api/page_layout/parambase/param1', follow_redirects=True)
        assert json.loads(response.data)['error_type'] == '403'
        response = client.get('/api/page_layout/not_exist', follow_redirects=True)
        assert json.loads(response.data)['error_type'] == '404'

def test_handle_page_action(adminapp):
    def on_callback_arg(arg):
        return NavigateTo('/detail')
    def on_callback_none():
        return []
    cb_uuid_arg = callbackRegistry.uuid_for_callback(on_callback_arg)
    cb_uuid_none = callbackRegistry.uuid_for_callback(on_callback_none)
    with adminapp.app.test_client() as client:
        response = client.post('/api/page_action', json={'cb_uuid': 'random cb_uuid'}, follow_redirects=True)
        assert json.loads(response.data)['error_type'] == '204'
        response = client.post('/api/page_action', json={'cb_uuid': cb_uuid_arg, 'args':['hasarg']}, follow_redirects=True)
        assert json.loads(response.data)['type'] == 'NavigateTo'
        
def test_handle_login_action(adminapp):
    with adminapp.app.test_client() as client:
        response = client.post('/api/login', json={'username': 'alice', 'password':'123456'}, follow_redirects=True)
        assert json.loads(response.data)['error_type'] == '501'
    @adminapp.login()
    def on_login(username, password):
        if username=='alice' and password=='123456':
            return LoggedInUser("Alice", redirect_to='/detail')
        else:
            return LoginFailed()
    with adminapp.app.test_client() as client:
        response = client.post('/api/login', json={'username': 'alice', 'password':'123456'}, follow_redirects=True)
        assert type(json.loads(response.data)['token']) is str
        response = client.post('/api/login', json={'username': 'alice', 'password':'1234567'}, follow_redirects=True)
        assert json.loads(response.data)['status'] == 'error'

def test_serve_menu(adminapp):
    adminapp.set_menu([MenuItem('About', '/about'), MenuItem('Protected', '/about', auth_needed='user')])
    with adminapp.app.test_client() as client:
        response = client.get('api/main_menu', follow_redirects=True)
        assert json.loads(response.data) == {'menu': [{'children': [], 'component': './index', 'icon': None, 'name': 'About', 'path': '/about'}]}
    # assert False

def test_serve_root(adminapp):
    with adminapp.app.test_client() as client:
        response = client.get('/', follow_redirects=True)
        assert str(response.data).find('script src="/umi.') != -1

def test_run(adminapp, mocker):
    mocker.patch.object(adminapp.app, 'run', autospec=True)
    adminapp.run()
    adminapp.app.run.assert_called_once_with()

def test_uuid_for_callback(adminapp):
    def myfunc():
        pass
    assert callbackRegistry.uuid_for_callback(None) is None
    uuid = callbackRegistry.uuid_for_callback(myfunc)
    assert uuid == callbackRegistry.uuid_for_callback(myfunc)
