from adminui import *
import os
from pathlib import Path

app = AdminApp()

app.app_title = 'AdminUI'
app.copyright_text = 'App with Login by AdminUI'
app.app_logo = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
app.footer_links = {'Github': 'https://github.com/bigeyex/python-adminui', 'Ant Design': 'https://ant.design'}
app.app_styles = {'nav_theme': 'light', 'layout': 'topmenu'}
app.static_files = {'/upload': os.path.join(Path(__file__).parent.absolute(), 'upload')}

app.register_link={'Sign Up': '/signup'}
app.forget_password_link={'Forget Password': '/forget'}

@app.login()
def on_login(username, password):
    if username=='alice' and password=='123456':
        return LoggedInUser("Alice", redirect_to='/detail')
    else:
        return LoginFailed()

@app.page('/', 'Logged In', auth_needed='user')
def form_page():
    return [
        Card('Logged In', [
            Header('You are logged in')
        ])
    ]

app.set_menu(
    [
        MenuItem('home', '/', icon="dashboard"),
        MenuItem('User Home', '/user_home/', icon="dashboard", auth_needed='user', children=[
            MenuItem('New Item', '/new/', icon="plus"),
            MenuItem('Search for Item', '/search', icon="search", auth_needed='admin'),
            MenuItem('Admin', '/admin/', icon="setting")
        ]),
        MenuItem('Admin Only', '/', icon="dashboard", auth_needed='admin', children=[
            MenuItem('New Item', '/new/', icon="plus"),
            MenuItem('Search for Item', '/search', icon="search"),
            MenuItem('Admin', '/admin/', icon="setting")
        ]),
        MenuItem('About', '/about/', icon="info-circle")
    ]
)

if __name__ == '__main__':
    app.run()
