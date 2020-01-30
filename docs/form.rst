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

In the content section of the form, you may add ``TextField`` and other form controls. See 
the next section for details

Finally, don't forget to add a submit button. Insert a ``FormActions`` object with ``Submit``
at the end of the form::

    FormActions(content = [
        SubmitButton('Submit')
    ])

Now your form is created.

List of Form Controls
**************************************

Here are a list of controls you may use in your form:

.. image:: images/form/textfield.jpg

.. code-block:: python

    TextField('Title', required_message='Title is required!')

.. autoclass:: adminui.TextField
   :members:

.. image:: images/form/textarea.jpg

.. code-block:: python

    TextArea('Description')

.. autoclass:: adminui.TextArea
   :members:

.. image:: images/form/select.jpg

.. code-block:: python

    SelectBox('Type', data=['One', 'Two', 'Three'], placeholder="Select One")

.. autoclass:: adminui.SelectBox
   :members:

.. image:: images/form/checkboxes.jpg

.. code-block:: python

    CheckboxGroup('Checks', data=['One', 'Two'])

.. autoclass:: adminui.CheckboxGroup
   :members:

.. image:: images/form/datepicker.jpg

.. code-block:: python

    DatePicker('Date')

.. image:: images/form/datepickerrange.jpg

.. code-block:: python

    DatePicker('Range', pick='range')

.. autoclass:: adminui.DatePicker
   :members:

Callback when form item changes
**************************************

If you want to do something, say update a part of the page when user select an item in the SelectBox
or input text on the TextFields, you may add on_change handlers in your Python code::

    TextField('Title', required_message='Title is required!', on_change=on_change),

    # for the handler:
    def on_change(value, values):
        print(value)
        print(values)

See chapter :ref:`Page Actions`. for details on what can handlers do.

The handler could be a function taking one or two parameters: the first will be the new value of the form item;
the second one will be a dictionary of all the values in the form where the form item lives. This will be useful
for example when your data shown in the page is filtered by a list of criterions.