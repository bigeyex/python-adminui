from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

@app.page('/', 'form')
def form_page():
    return [
        Form(on_submit = on_submit, content = [
            TextField('Title'),
            TextArea('Description'),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]

app.set_menu(
    [
        MenuItem('Home', '/', icon="dashboard", children=[
            MenuItem('New Item', '/new', icon="plus"),
            MenuItem('Search for Item', '/search', icon="search"),
            MenuItem('Admin', '/admin', icon="setting")
        ]),
        MenuItem('About', '/about', icon="info-circle")
    ]
)

if __name__ == '__main__':
    app.run()