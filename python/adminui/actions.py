from .element import Element
from .app import AdminApp
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
    """
    def __init__(self, title='', text=None):
        super().__init__('Notification', title=title, text=text)