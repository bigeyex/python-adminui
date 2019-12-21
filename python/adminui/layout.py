from .element import Element

class Card(Element):
    def __init__(self, content=None):
        super().__init__('Card', content=content)

class DetailGroup(Element):
    def __init__(self, title='', content=None):
        super().__init__('DetailGroup', title=title, content=content)

class DetailItem(Element):
    def __init__(self, title='', value=''):
        super().__init__('DetailItem', title=title, value=value)

class Divider(Element):
    def __init__(self):
        super().__init__('Divider')

class Header(Element):
    def __init__(self, text='', level=4):
        super().__init__('Header', text=text, level=level)

class Paragraph(Element):
    def __init__(self, text=''):
        super().__init__('Paragraph', text=text)
        