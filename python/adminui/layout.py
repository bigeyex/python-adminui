from .element import Element

class Card(Element):
    def __init__(self, content=None):
        super().__init__('Card', content=content)