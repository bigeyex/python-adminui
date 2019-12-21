from .element import Element
from .app import callbackRegistry

class Form(Element):
    def __init__(self, content=None, on_submit=None):
        on_submit_uuid = callbackRegistry.uuid_for_callback(on_submit)
        super().__init__('Form', content=content, on_submit=on_submit_uuid)

class TextField(Element):
    def __init__(self, title, name=None, required=False):
        if name is None:
            name = title.lower()
        super().__init__('TextField', title=title, name=name, required=required)

class TextArea(Element):
    def __init__(self, title, name=None, required=False):
        if name is None:
            name = title.lower()
        super().__init__('TextArea', title=title, name=name, required=required)

class FormActions(Element):
    def __init__(self, content=None):
        super().__init__('FormActions', content=content)

class SubmitButton(Element):
    def __init__(self, title="Submit"):
        super().__init__('SubmitButton', title=title)

class Button(Element):
    def __init__(self, title="Go", style=None, icon=None, on_click=None):
        on_click_uuid = callbackRegistry.uuid_for_callback(on_click)
        super().__init__('Button', title=title, style=style, icon=icon, on_click=on_click_uuid)

class Link(Element):
    def __init__(self, title="Action", on_click=None, link_to=None):
        on_click_uuid = callbackRegistry.uuid_for_callback(on_click)
        super().__init__('Link', title=title, link_to=link_to, on_click=on_click_uuid)

