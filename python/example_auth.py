from adminui import *

app = AdminApp()

@app.login()
def on_login(username, password):
    if username=='admin' and password=='123456':
        return LoginAndNavigateTo('/', "admin")
    else:
        return Notification("Username or password is incorrect")

@app.page('/auth_login', 'Logged In', ['user'])
def form_page():
    return [
        Card('Logged In', [
            Header('You are logged in')
        ])
    ]

if __name__ == '__main__':
    app.run()