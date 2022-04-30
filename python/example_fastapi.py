from adminui import *

app = AdminApp(use_fastapi=True)

@app.login()
def on_login(username, password):
    if username=='alice' and password=='123456':
        return LoggedInUser("Alice", redirect_to='/detail')
    else:
        return LoginFailed()

@app.page('/log_in_zone', 'Logged In', auth_needed='user')
def logged_in_page():
    return [
        Card('Logged In', [
            Header('You are logged in')
        ])
    ]

def on_submit(form_data):
    print(app.uploaded_file_location(form_data['upload']))

def on_upload(file):
    print("=== file name will be: ===")
    print(file['file_name'])
    print('=== the file is stored in: ===')
    print(app.uploaded_file_location(file))


@app.page('/', 'form')
def form_page():
    return [
        Card('Upload Form', [
            Upload(on_data=on_upload)
        ]),

        Form(on_submit = on_submit, content = [
            Upload(name='upload', on_data=on_upload),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]


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
    return [
        ReplaceElement('paragraph', Paragraph('This element has been changed')),
        ReplaceElement('paragraph2', Paragraph('This element has also been changed'))
    ]

def on_notify_twice():
    return CombinedAction([
        Notification('A Notification', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea'),
        Notification('A Notification', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea')
    ])

@app.page('/control', 'Control Page')
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
            Paragraph('This is the original content', id='paragraph'),
            Paragraph('This is also a paragraph', id='paragraph2')
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

app.set_menu(
    [
        MenuItem('home', '/', icon="dashboard"),
        MenuItem('Log in zone', '/log_in_zone', icon="plus"),
        MenuItem('Control Page', '/control', icon="plus"),
    ]
)

fastapi_app = app.prepare()