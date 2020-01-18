from .element import Element
from .app import callbackRegistry

class Form(Element):
    """Create a form in the page
    
    Args:
        content (Element[], optional): an array of Element objects as content of the form. Defaults to None.
        on_submit (func, optional): a callback function called when the user submits the form. Defaults to None.
    """
    def __init__(self, content=None, on_submit=None, title_inline=True, id=None):
        on_submit_uuid = callbackRegistry.uuid_for_callback(on_submit)
        super().__init__('Form', content=content, style={'titleInline': title_inline}, on_submit=on_submit_uuid, id=id)

class TextField(Element):
    """Create a text field in the form. 
    
    Args:
        title: the title of the field
        name: the key of the dictionary data passed to the callback when the form is submitted
        required_message: if other than None, the field will be required and an message will be shown
            when the field is not filled at form submission.
        placeholder: the text message shown when the field is not filled.
    """
    def __init__(self, title, name=None, required_message=None, value=None, placeholder=None, id=None):
        if name is None:
            name = title.lower()
        super().__init__('TextField', title=title, name=name, required_message=required_message,
                            value=value, placeholder=placeholder, id=id)

class TextArea(Element):
    """Create a text area object
    
    Args:
        title: the title of the field
        name: the key of the dictionary data passed to the callback when the form is submitted
        required_message: if other than None, the field will be required and an message will be shown
            when the field is not filled at form submission.
        placeholder: the text message shown when the field is not filled.
    """
    def __init__(self, title, name=None, required_message=None, value=None, placeholder=None, id=None):
        if name is None:
            name = title.lower()
        super().__init__('TextArea', title=title, name=name, required_message=required_message, 
                            value=value, placeholder=placeholder, id=id)

class SelectBox(Element):
    """Create a dropdown box for selecting in a list
    
    Args:
        title: the title of the field
        name: the key of the dictionary data passed to the callback when the form is submitted
        required_message: if other than None, the field will be required and an message will be shown
            when the field is not filled at form submission.
        data: the options in the select box. in format of a list of str or a list of [title, value] list
            e.g. ['one', 'two', 'three'] or [['one', 1], ['two', 2]], both accepted
        placeholder: the text message shown when the field is not filled.
    """
    def __init__(self, title, name=None, value=None, data=[], placeholder=None, required_message=None, id=None):
        if name is None:
            name = title.lower()
        uniform_data = [x if type(x) is list else [x, x] for x in data]
        super().__init__('SelectBox', title=title, name=name, required_message=required_message, 
                            data=uniform_data, value=value, placeholder=placeholder, id=id)

class CheckboxGroup(Element):
    """Create a group of checkbox for multi-selecting
    
    Args:
        title: the title of the field
        name: the key of the dictionary data passed to the callback when the form is submitted
        data: the title and value of individual checkboxes. in format of a list of str or a list of [title, value]
            e.g. ['one', 'two', 'three'] or [['one', 1], ['two', 2]], both accepted
    """
    def __init__(self, title, name=None, data=[], value=None, id=None):
        if name is None:
            name = title.lower()
        uniform_data = [x if type(x) is list else [x, x] for x in data]
        super().__init__('CheckboxGroup', title=title, name=name, data=uniform_data, value=value, id=id)

class Checkbox(Element):
    def __init__(self, title, name=None, value=None, id=None):
        if name is None:
            name = title.lower()
        super().__init__('Checkbox', title=title, name=name, value=value, id=id)

class DatePicker(Element):
    """Create a date picker to pick a date or date range
    
    Args:
        title: the title of the field
        name: the key of the dictionary data passed to the callback when the form is submitted
        pick: 'date' | 'month' | 'week' | 'range'. 
    """
    def __init__(self, title, name=None, value=None, pick='date', id=None):
        if name is None:
            name = title.lower()
        super().__init__('DatePicker', title=title, name=name, value=value, subtype=pick, id=id)

class FormActions(Element):
    """Create a line of action buttons in the form
    
    Args:
        content: an array of Elements such as SubmitButton
    """
    def __init__(self, content=None, id=None):
        super().__init__('FormActions', content=content, id=id)

class SubmitButton(Element):
    """Create a submit button for the form. Better inside FormActions
    
    Args:
        title: the text that appears on the button
    """
    def __init__(self, title="Submit", id=None):
        super().__init__('SubmitButton', title=title)

class Button(Element):
    """Create a general button on the page
    
    Args:
        title: the title shown on the button
        style: use 'primary' for the "primary button" (a big blue button)
        icon: the icon in front of the button title. For string values see https://ant.design/components/icon/
        on_click: a custom function will be called when the button is clicked 
    """
    def __init__(self, title="Go", style=None, icon=None, on_click=None, id=None):
        on_click_uuid = callbackRegistry.uuid_for_callback(on_click)
        super().__init__('Button', title=title, style=style, icon=icon, on_click=on_click_uuid, id=id)

class Link(Element):
    """Create a hyperlink on the page
    
    Args:
        title: the text of the link
    """
    def __init__(self, title="Action", on_click=None, link_to=None, id=None):
        on_click_uuid = callbackRegistry.uuid_for_callback(on_click)
        super().__init__('Link', title=title, link_to=link_to, on_click=on_click_uuid, id=id)

