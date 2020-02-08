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
                    SelectBox('Type', data=['One', 'Two', 'Three'], placeholder="Select One", multiple=True)
                ]),
                Column([
                    CheckboxGroup('Checks', data=['One', 'Two'])
                ]),
                Column([
                    Switch()
                ]),
            ]),
            Row([
                Column([DatePicker('Date')]),
                Column([DatePicker('Month', pick='month')]),
                Column([DatePicker('Range', pick='range')]),
                Column([
                    Slider(0, 50, range=True, value=[20,30])
                ]),
            ]),
            FormActions(content = [
                SubmitButton('Submit')
            ])
        ])
    ]

if __name__ == '__main__':
    app.run()