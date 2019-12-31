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

class LoginAndNavigateTo(Element):
    def __init__(self, url='/', display_name='', auth=['user'], user_info=None):
        token = jwt.encode({
            "display_name": display_name,
            "auth": auth,
            "user_info": user_info
        }, AdminApp.SECRET, algorithm='HS256')
        super().__init__('LoginAndNavigateTo', url=url, display_name=display_name, token=token)