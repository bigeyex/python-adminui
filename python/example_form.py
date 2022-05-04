from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

def on_change(value, values):
    print(value)
    print(values)

@app.page('/', 'form')
def form_page():
    return [
        Form(on_submit = on_submit, content = [
            TextField('Title', required_message='Title is required!', on_change=on_change),
            TextArea('Description', on_change=on_change),
            SelectBox('Type', data=['One', 'Two', 'Three'], placeholder="Select One", on_change=on_change),
            CheckboxGroup('Checks', data=['One', 'Two'], on_change=on_change),
            RadioGroup('Radio - Default', data=['One', 'Two'], on_change=on_change),
            RadioGroup('Radio - Vertical', data=[['One', 1], ['Two', 2]], on_change=on_change, format='vertical'),
            RadioGroup('Radio - Button', data=[['One', 1], ['Two', 2]], on_change=on_change, format='button'),
            DatePicker('Date', on_change=on_change),
            DatePicker('Range', pick='range', on_change=on_change),
            Upload(on_data=on_submit),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]

if __name__ == '__main__':
    app.run()