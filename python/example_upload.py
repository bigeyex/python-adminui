from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data['upload'])

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

if __name__ == '__main__':
    app.run()