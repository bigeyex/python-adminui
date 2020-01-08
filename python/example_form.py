from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

@app.page('/', 'form')
def form_page():
    return [
        Form(on_submit = on_submit, content = [
            TextField('Title', required_message='Title is required!'),
            TextArea('Description'),
            SelectBox('Type', data=['One', 'Two', 'Three'], placeholder="Select One"),
            CheckboxGroup('Checks', data=['One', 'Two']),
            DatePicker('Date'),
            DatePicker('Range', pick='range'),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]

if __name__ == '__main__':
    app.run()