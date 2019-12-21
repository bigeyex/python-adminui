from .element import Element

class CombinedAction(Element):
    def __init__(self, content=[]):
        super().__init__('CombinedAction', content=content)

class NavigateTo(Element):
    def __init__(self, url='/'):
        super().__init__('NavigateTo', url=url)

class Notification(Element):
    def __init__(self, title='', text=None):
        super().__init__('Notification', title=title, text=text)

