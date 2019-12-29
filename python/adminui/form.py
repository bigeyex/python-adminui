from .element import Element
from .app import callbackRegistry

class Form(Element):
    """Create a form in the page
    
    Args:
        content (Element[], optional): an array of Element objects as content of the form. Defaults to None.
        on_submit (func, optional): a callback function called when the user submits the form. Defaults to None.
    """
    def __init__(self, content=None, on_submit=None):
        on_submit_uuid = callbackRegistry.uuid_for_callback(on_submit)
        super().__init__('Form', content=content, on_submit=on_submit_uuid)

class TextField(Element):
    """Create a text field in the form. 
    
    Args:
        title: the title of the field
        name: the key of the dictionary data passed to the callback when the form is submitted
        required_message: if other than None, the field will be required and an message will be shown
            when the field is not filled at form submission.
        placeholder: the text message shown when the field is not filled.
    """
    def __init__(self, title, name=None, required_message=None, value=None, placeholder=None):
        if name is None:
            name = title.lower()
        super().__init__('TextField', title=title, name=name, required_message=required_message,
                            value=value, placeholder=placeholder)

class TextArea(Element):
    """Create a text area object
    
    Args:
        title: the title of the field
        name: the key of the dictionary data passed to the callback when the form is submitted
        required_message: if other than None, the field will be required and an message will be shown
            when the field is not filled at form submission.
        placeholder: the text message shown when the field is not filled.
    """
    def __init__(self, title, name=None, required_message=None, value=None, placeholder=None):
        if name is None:
            name = title.lower()
        super().__init__('TextArea', title=title, name=name, required_message=required_message, 
                            value=value, placeholder=placeholder)

class FormActions(Element):
    """Create a line of action buttons in the form
    
    Args:
        content: an array of Elements such as SubmitButton
    """
    def __init__(self, content=None):
        super().__init__('FormActions', content=content)

class SubmitButton(Element):
    """Create a submit button for the form. Better inside FormActions
    
    Args:
        title: the text that appears on the button
    """
    def __init__(self, title="Submit"):
        super().__init__('SubmitButton', title=title)

class Button(Element):
    """Create a general button on the page
    
    Args:
        title: the title shown on the button
        style: use 'primary' for the "primary button" (a big blue button)
        icon: the icon in front of the button title. For string values see https://ant.design/components/icon/
        on_click: a custom function will be called when the button is clicked 
    """
    def __init__(self, title="Go", style=None, icon=None, on_click=None):
        on_click_uuid = callbackRegistry.uuid_for_callback(on_click)
        super().__init__('Button', title=title, style=style, icon=icon, on_click=on_click_uuid)

class Link(Element):
    """Create a hyperlink on the page
    
    Args:
        title: the text of the link
    """
    def __init__(self, title="Action", on_click=None, link_to=None):
        on_click_uuid = callbackRegistry.uuid_for_callback(on_click)
        super().__init__('Link', title=title, link_to=link_to, on_click=on_click_uuid)

