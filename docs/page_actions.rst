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

Update page content in Page Actions
**************************************

If you wish to change a part of the page in Page Actions, first identify the element with ``id`` attribute::

    @app.page('/', 'Control Page')
    def control_page():
        return [
            Card(content=[
                Button('Change Content', on_click=on_change_content),
                Button('Change Element', on_click=on_change_self),
            ]),
            Card(id='detail_card'),
            Card('Paragraph Card', [
                Paragraph('This is the original content', id='paragraph')
            ])
        ]

Then during a page action, you may return a ``ReplaceElement`` to replace an element with another::

    def on_change_self():
        return ReplaceElement('paragraph', Paragraph('This element has been changed'))

Thus when users click the button "Change Element", a new paragraph will replace the old one.

You may also choose to update some attributes of an element. The following code changes the ``content``
value of "detail_card" element when the users click the "Change Content" button.::

    return UpdateElement('detail_card', content=[
            DetailGroup('Refund Request', content=[
                DetailItem('Ordre No.', 1100000),
                DetailItem('Status', "Fetched"),
                DetailItem('Shipping No.', 1234567),
                DetailItem('Sub Order', 1135456)
            ]),
        ])

See example_page_actions.py for the complete example.
https://github.com/bigeyex/python-adminui/blob/master/python/example_page_actions.py