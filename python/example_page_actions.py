from adminui import *

app = AdminApp()

def on_detail():
    return NavigateTo('/detail')

def on_notify():
    return Notification('A Notification', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea')

def on_change_content():
    return UpdateElement('detail_card', content=[
            DetailGroup('Refund Request', content=[
                DetailItem('Ordre No.', 1100000),
                DetailItem('Status', "Fetched"),
                DetailItem('Shipping No.', 1234567),
                DetailItem('Sub Order', 1135456)
            ]),
        ])

def on_change_self():
    return ReplaceElement('paragraph', Paragraph('This element has been changed'))

def on_notify_twice():
    return CombinedAction([
        Notification('A Notification', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea'),
        Notification('A Notification', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea')
    ])

@app.page('/', 'Control Page')
def control_page():
    return [
        Card(content=[
            Button('Navigate to details', on_click=on_detail),
            Button('Change Content', on_click=on_change_content),
            Button('Change Element', on_click=on_change_self),
            Button('Notify me', icon='notification', on_click=on_notify),
            Button('Notify Twice', icon='notification', on_click=on_notify_twice)
        ]),
        Card(id='detail_card'),
        Card('Paragraph Card', [
            Paragraph('This is the original content', id='paragraph')
        ])
    ]

@app.page('/detail', 'Detail Page')
def detail_page():
    return [
        Card(content=[
            DetailGroup('Refund Request', content=[
                DetailItem('Ordre No.', 1100000),
                DetailItem('Status', "Fetched"),
                DetailItem('Shipping No.', 1234567),
                DetailItem('Sub Order', 1135456)
            ]),
        ])
    ]

if __name__ == '__main__':
    app.run()