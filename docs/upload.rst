Upload Files
===============

File uploader can be a individual component or be a part of a form::

    @app.page('/', 'form')
    def form_page():
        return [
            Card('Upload Form', [
                Upload(on_data=on_upload)  # use Upload individually
            ]),

            Form(on_submit = on_submit, content = [
                Upload(name='upload', on_data=on_upload),     # embed uploads in a form
                FormActions(content = [
                    SubmitButton('Submit')
                ])
            ])
        ]

The ``on_data`` handler will be called if a file is uploaded::

    def on_upload(file):
        print("=== file name will be: ===")
        print(file['file_name'])
        print('=== the file is stored in: ===')
        print(app.uploaded_file_location(file))

Use ``app.uploaded_file_location(file)`` to get the absolute path of the uploaded file.

When you gave a ``name`` to the Upload Component, you can also retrive the file when the form is submitted::

    def on_submit(form_data):
        print(app.uploaded_file_location(form_data['upload'])) # e.g. the upload component's name is 'upload'

By default, the file will be stored in /upload of the folder containing the starter Python file, 
but you can change it by passing an ``upload_folder`` when creating the AdminUI App::

    app = AdminApp(upload_folder='Your custom folder')

