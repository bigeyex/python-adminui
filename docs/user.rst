Require users to Log in
============================

AdminUI comes with a login page. To enable it, specify a function to handle login::

    @app.login()
    def on_login(username, password):
        if username=='alice' and password=='123456':
            return LoggedInUser("Alice")
        else:
            return LoginFailed()

The function will receive the username and password users inputted; you need to return LoggedInUser
or LoginFailed depending on the result. Instead of a simple if statement, typically you need to 
check the credential against a database or something.

The returned LoggedInUser and LoginFailed may contain more information:

.. autoclass:: adminui.LoggedInUser
   :members:

.. autoclass:: adminui.LoginFailed
   :members:

Pages requires authorization
**************************************

By default, any user can visit the page you described. If you want to show the page to users
only with certain permission, add an auth_needed attribute to your page::

    @app.page('/', 'Logged In', auth_needed='user')
    def form_page():
        return [
            Card('Logged In', [
                Header('You are logged in')
            ])
        ]

In this way, only logged in users can visit this page. Other users will be redirected to
the login page.

You may also use `auth_needed='admin'`, then a user logged in with::

    LoggedInUser("Alice", auth=['user', 'admin'])

May access this page, since the user Alice has 'admin' authority.


Menus for different user roles
**************************************

Menus can also be protected, by attaching `auth_needed` attribute. For example::

    MenuItem('User Home', '/user_home', icon="dashboard", auth_needed='user')

