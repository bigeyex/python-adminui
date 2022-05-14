Page with a Parameter
============================

Sometimes, you need to make the page respond to url parameters. For example, you wish::

    http://yourdomain.com/article/3

shows the third article in the database. In this case, you register the page as such::

    @app.page('/article', 'Article')
    def form_page(param):
        return [ ... the content of the page ... ]

Then, when users come with url like ``/article/<param>``, the ``param`` part will be
passed as the first parameter of the handling function.

If you the page has multiple parameters in the url like ``/page_name?param_a=value_a&param_b=value_b``, 
you can get them with the second parameter in your page handler::

    @app.page('/detail', 'Detail Page')
    def detail_page(arg, all_args):
        ... # all_args will be a dictionary of all the params