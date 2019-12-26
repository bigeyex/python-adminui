Creating a Form
===============

To create a form, insert a ``Form`` object inside the list describing the page::

    @app.page('/', 'Form')
    def form_page():
        return [
            Form(on_submit = my_function, 
                   content = [ ... content of the form ... ])
        ]

Here, you may want to provide a function that will be called when the user submits 
the form, so you can process the data. The function may have any name, here ``my_function``
is used as an example. This function needs to be defined with an argument, which will be
the form values as a dictionary::

    def my_function(values):
        ... do things with values ...

In the content section of the form, you may add ``TextField`` or ``TextArea``:

.. autoclass:: adminui.TextField
   :members:

.. autoclass:: adminui.TextArea
   :members:

Finally, don't forget to add a submit button. Insert a ``FormActions`` object with ``Submit``
at the end of the form::

    FormActions(content = [
        SubmitButton('Submit')
    ])

Now your form is created.