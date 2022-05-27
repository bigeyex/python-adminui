from .element import Element
from .app import AdminApp
from .app import callbackRegistry
import jwt

class CombinedAction(Element):
    """Combines two page actions together as the return value
    
    Args:
        content: an array of page actions
    """
    def __init__(self, content=[]):
        super().__init__('CombinedAction', content=content)

class NavigateTo(Element):
    """Page Action: navigate the user to another page
    
    Args:
        url: the url of the new page
    """
    def __init__(self, url='/'):
        super().__init__('NavigateTo', url=url)

class Notification(Element):
    """Send right-top corner notification to the user
    
    Args:
        title: the title of the notification
        text: the text body of the notification
        type: default | success | info | warning | error: type of the notification box
    """
    def __init__(self, title='', text=None, type='default'):
        super().__init__('Notification', title=title, subtype=type, text=text)

class ShowModalForm(Element):
    """Display a modal form for the user
    
    Args:
        content (Element[], optional): an array of Element objects as content of the form. Defaults to None.
        on_submit (func, optional): a callback function called when the user submits the form. Defaults to None.
    """
    def __init__(self, title='', content=None, on_submit=None, title_inline=True, id=None):
        on_submit_uuid = callbackRegistry.uuid_for_callback(on_submit)
        super().__init__('ShowModalForm', title=title, content=content, style={'titleInline': title_inline}, on_submit=on_submit_uuid, id=id)

class CloseModalForm(Element):
    def __init__(self):
        super().__init__('CloseModalForm')

class UpdateElement(Element):
    def __init__(self, id='', **kwargs):
        super().__init__('UpdateElement', id=id, **kwargs)

class ReplaceElement(Element):
    def __init__(self, id='', element=None):
        super().__init__('ReplaceElement', id=id, element=element)

