from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

@app.page('/', 'Detail Page')
def detail_page():
    return [
        Card(content=[
            DetailGroup('Refund Request', content=[
                DetailItem('Ordre No.', 1100000),
                DetailItem('Status', "Fetched"),
                DetailItem('Shipping No.', 1234567),
                DetailItem('Sub Order', 1135456)
            ]),
            Divider(),
            DetailGroup('User Info', content=[
                DetailItem('Name', "Alice"),
                DetailItem('Phone', "555-123-4567"),
                DetailItem('Shipping Service', 'Continent Ex'),
                DetailItem('Address', 'XXX XXXX Dr. XX-XX, XXXXXX NY 12345'),
                DetailItem('Remarks', "None")
            ]),
            Divider(),
            Header('Header 1', 1),
            Header('Header 2', 2),
            Header('Header 3', 3),
            Header('Header 4', 4),
            Paragraph('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
        ])
    ]

if __name__ == '__main__':
    app.run()