from adminui import *

app = AdminApp()

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
        MenuItem('User Home', '/user_home', icon="dashboard", auth_needed='user', children=[
            MenuItem('New Item', '/new', icon="plus"),
            MenuItem('Search for Item', '/search', icon="search", auth_needed='admin'),
            MenuItem('Admin', '/admin', icon="setting")
        ]),
        MenuItem('Admin Only', '/', icon="dashboard", auth_needed='admin', children=[
            MenuItem('New Item', '/new', icon="plus"),
            MenuItem('Search for Item', '/search', icon="search"),
            MenuItem('Admin', '/admin', icon="setting")
        ]),
        MenuItem('About', '/about', icon="info-circle")
    ]
)

if __name__ == '__main__':
    app.run()