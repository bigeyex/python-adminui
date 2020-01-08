from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

@app.page('/', 'form')
def form_page():
    return [
        Form(on_submit = on_submit, title_inline=False, content = [
            Row([
                Column([TextField('Title', required_message='Title is required!')]),
                Column([
                    SelectBox('Type', data=['One', 'Two', 'Three'], placeholder="Select One")
                ]),
                Column([
                    CheckboxGroup('Checks', data=['One', 'Two'])
                ]),
            ]),
            Row([
                Column([DatePicker('Date')]),
                Column([DatePicker('Month', pick='month')]),
                Column([DatePicker('Range', pick='range')]),
            ]),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]

if __name__ == '__main__':
    app.run()