from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

def on_timer_fire(timer_data):
    print('timer fire')
    print(timer_data)

@app.page('/form', 'form')
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

@app.page('/', 'Detail Page')
def detail_page():
    return [
        Card(content=[
            Timer(on_fire=on_timer_fire, data='hello timer'),
            Header('Header 1', 1),
            DetailGroup('Refund Request', content=[
                DetailItem('Order No.', 1100000),
                DetailItem('Status', "Fetched"),
                DetailItem('Shipping No.', 1234567),
                DetailItem('Sub Order', 1135456)
            ], bordered=True),
            Button('A Button'),
            Link('A Link'),
            Divider(),

            Spin(),

            Spin('loading', content=[
                DetailGroup('User Info', content=[
                    DetailItem('Name', "Alice"),
                    DetailItem('Phone', "555-123-4567"),
                    DetailItem('Shipping Service', 'Continent Ex'),
                    DetailItem('Address', 'XXX XXXX Dr. XX-XX, XXXXXX NY 12345'),
                    DetailItem('Remarks', "None")
                ]),
            ]),
            
            Divider(),
            Tabs([
                Group(name='Headers', content=[
                    Header('Header 1', 1),
                    Header('Header 2', 2),
                    Header('Header 3', 3),
                    Header('Header 4', 4),
                ]),
                Group(name='Misc', content=[
                    Image('https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', 'Github', width=300),
                    Paragraph("a red paragraph", color='red'),
                    RawHTML('a raw <font color="red">HTML</font>'),
                ]),
            ]),
            
            Paragraph("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
        ])
    ]

if __name__ == '__main__':
    app.run()