from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

app.add_page(Page('/', 'form', 
    [
        Form(on_submit = on_submit, content = [
            TextField('Title', required=True),
            TextArea('Description'),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]
))

@app.page('/', 'form')
def form_page():
    return [
        Form(on_submit = on_submit, content = [
            TextField('Title', required=True),
            TextArea('Description'),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]

if __name__ == '__main__':
    app.run()