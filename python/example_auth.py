from adminui import *

app = AdminApp()

@app.login()
def on_login(username, password):
    if username=='alice' and password=='123456':
        return LoggedInUser("Alice")
    else:
        return LoginFailed()

@app.page('/', 'Logged In', ['user'])
def form_page():
    return [
        Card('Logged In', [
            Header('You are logged in')
        ])
    ]

if __name__ == '__main__':
    app.run()