from adminui import AdminApp, Page, LoggedInUser

import pytest
import jwt

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

