Customization
============================

You can change the title of your app::

    app.app_title = "AdminUI APP"

And you can change the logo. It accepts an URL::

    app.app_logo = "http://...."

And you can change the copyright (in the footer) text like::

    app.copyright_text = 'App with Login by AdminUI'

(Leave a blank string if you don't need it)

Or change the footer links::

    app.footer_links = {'Github': 'https://github.com/bigeyex/python-adminui', 'Ant Design': 'https://ant.design'}


Change menu style with::

    app.app_styles = {'nav_theme': 'light', 'layout': 'topmenu'}

where nav_theme takes 'dark'(default) or 'light'; layout takes 'sidemenu'(default) or 'topmenu'

Favicons
**************************************

You may set another favicon other than the default one::

    app.app_favicon = os.path.join(Path(__file__).parent.absolute(), 'new-favicon.png')