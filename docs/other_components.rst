Other Components
============================

Progress
********

You can draw a progress bar with::

    Progress(30)
    Progress(30, format='circle')

.. image:: images/other/circle_progress.jpg

Image
********

To add an image::

    Image('https://url-of-the-image', 'alt-text', width=300)

Group (HTML Div)
********

Use Group to group content together, so you may change them with 
``UpdateElement`` page action

(in fact, it just creates a <div/> element in html)::

    Group(id='id of the content', content=[...content in the group])


Tabs
********

.. image:: images/other/tabs.jpg

Use tabs to group content together::

    Tabs([
        Group(name='title of tab 1', content=[
            ... content of tab 1
        ]),
        Group(name='title of tab 2', content=[
            ... content of tab 2
        ]),
    ]),

You may set the tab appearance with ``position``, ``format``, and ``size``, see

.. autoclass:: adminui.Tabs
   :members:


Spin
********

.. image:: images/other/spin.jpg

Creates a spinning wheel::

    Spin()

.. image:: images/other/spin-region.jpg

You can also setup a region masked under a spinning wheel.
When the loading is done, remove it with Page Actions::

    Spin('loading', content=[
        ... content under the mask...
    ]),

.. autoclass:: adminui.Spin
   :members:


Empty Status
************

.. image:: images/other/empty.jpg

Display the empty status::

    Empty()

.. autoclass:: adminui.Empty
   :members:

Result
************

.. image:: images/other/result.jpg

Display the result of an operation::

    Result('The program runs successfully')

.. autoclass:: adminui.Result
   :members:
