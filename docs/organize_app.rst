Organizing your App
===================

When your app grows bigger, you may need to split it to 
multiple files. 

While there are many ways to do this in Python, adminui provides 
a simple way for simple apps.

For (a minimal simple) example, you want to make an app with a home page 
and a detail page, so the structure is like::

    home.py
    detail.py

in ``home.py``, you layout the home page like::

    from adminui import *

    app = AdminApp()
    @app.page('/', 'home')
    def home_page():
        ... layout the home page ...

    app.set_as_shared_app() # set the app as the shared app, so it can be accessed globally
    import detail           # import all the other files in your project (you can import files recursively
                            # meaning if you have admin_pages.py, you can import all the admin related pages there
                            # and in home.py just import admin_pages)

    if __name__ == '__main__':
        app.run()

note the ``app.set_as_shared_app()`` makes the app exposed in the whole project, and then
in the ``home.py`` , ``detail.py`` is imported.

in ``detail.py``, use ``AdminApp.shared_app()`` to access the app add add more pages::

    # content in detail.py
    from adminui import *

    app = AdminApp.shared_app() # now you have the app ready to add more pages

    @app.page('/detail', 'Detail Page')
    def detail_page():
        ... layout the detail page ...