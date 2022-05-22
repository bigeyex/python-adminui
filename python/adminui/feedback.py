from .element import Element

class Progress(Element):
    """A little piece of text with a title and a value, used to display a field in a record
    
    Args:
        value: the 'percentage' of the progress bar/ring
        format: line | circle | dashboard - the type of the progress bar
        status: success | exception | normal | active - the status style of the bar, only works with 'line' format
        show_info: whether the percent value is shown beside the bar
    """
    def __init__(self, value=50, status='normal', width=132, format='line', show_info=True, id=None):
        super().__init__('Progress', value=value, format=format, style={'status': status, 'width': width, 'showInfo':show_info}, id=id)

class Spin(Element):
    """A spinning icon, indicating something is loading
    
    Args:
        size: default | small | large: the size of the spinning wheel
        content: (optional), when creating a container with a "loading" mask, put its content here
        title: the text shown below the spinning wheel
    """
    def __init__(self, title='', content=[], size='default', id=None):
        super().__init__('Spin', title=title, content=content, size=size, id=id)