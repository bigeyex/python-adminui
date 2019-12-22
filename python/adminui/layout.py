from .element import Element

class Card(Element):
    def __init__(self, title=None, content=None):
        super().__init__('Card', title=None, content=content)

class ChartCard(Element):
    def __init__(self, title=None, value=None, tooltip=None, footer=None, content=None):
        super().__init__('ChartCard', title=title, value=value, tooltip=tooltip, footer=footer, content=content)
        self.components_fields = ['footer']

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

class Row(Element):
    def __init__(self, content=None):
        super().__init__('Row', content=content)

class Column(Element):
    def __init__(self, content=None, size=1):
        super().__init__('Column', size=size, content=content)

class Statistic(Element):
    def __init__(self, title='', value=0, show_trend=False, inline=False):
        super().__init__('Statistic', title=title, value=value, show_trend=show_trend, inline=inline)
