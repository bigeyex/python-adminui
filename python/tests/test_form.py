from adminui import *

def el_is(el, **kwargs):
    print(el.as_dict())
    print(kwargs)
    return el.as_dict().items() >= kwargs.items()

def test_form():
    f = Form([], on_submit=lambda x:x, id='myid')
    assert el_is(f, content=[], type='Form', id='myid')

def test_text_field():
    f = TextField("Text", 'name', 'required', 'value', 'placeholder', lambda x:'changed', id='myid')
    assert el_is(f, title='Text', name='name', required_message='required', 
            value='value', placeholder='placeholder', type='TextField', id='myid')

def test_text_area():
    f = TextArea('title', 'name', 'requiredmsg', 'value', 'placeholder', id='myid')
    assert el_is(f, title='title', name='name', required_message='requiredmsg', 
                value='value', placeholder='placeholder', type='TextArea', id='myid')
            
def test_select_box():
    f = SelectBox("Text", 'name', 'value', ['one', 'two'], 'placeholder', lambda x:'changed', required_message='requiredmsg', multiple=True, tags=True, id='myid')
    assert el_is(f, title='Text', name='name', required_message='requiredmsg', 
            value='value', placeholder='placeholder', multiple=True, tags=True,
            type='SelectBox', id='myid')


    

