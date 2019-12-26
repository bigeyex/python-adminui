Page Actions
============

If you want to redirect the user to another page after form submission, 
you may return page actions in the ``on_submit`` callback of the form::

    def on_detail():
        return NavigateTo('/detail')

Now AdminUI supports ``NavigateTo`` and ``Notification`` as page actions:

.. autoclass:: adminui.NavigateTo
   :members:

.. autoclass:: adminui.Notification
   :members:

If you want to combine two actions together, use ``CombineAction``. Say 
you want to notify the user twice::

    return CombinedAction([
        Notification('A Notification', 'the content of the notification'),
        Notification('A Notification', 'the content of the notification'),
    ])

Aside from form submission, you can also use page action on other elements like a button.

.. autoclass:: adminui.Button
   :members:

You may use page actions inside the on_click callback of the button.

