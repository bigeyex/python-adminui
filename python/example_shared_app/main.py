# these two lines are for debug only
# In your actual project, these are not needed.
import sys
sys.path.append("..")

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
        MenuItem('Form Page', '/', icon="dashboard"),
        MenuItem('Detail Page', '/detail', icon="info-circle")
    ]
)

app.set_as_shared_app()
import detail

if __name__ == '__main__':
    app.run()