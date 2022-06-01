from random import randrange
from adminui import *

app = AdminApp()

table_columns = [
    {'title': 'Rule Name', 'dataIndex': 'name', 'linkTo': 'link'},
    {'title': 'Description', 'dataIndex': 'desc'},
    {'title': '# of Calls', 'dataIndex': 'callNo', 'sorter': True},
    {'title': 'Status', 'dataIndex': 'status', 'filters': [{'text': 2, 'value': 2}, {'text': 3, 'value': 3}]},
    {'title': 'Updated At', 'dataIndex': 'updatedAt'}
]

def mock_table_data(num_records):
    return [
        {
            'id':i, 
            'name':"Alpha", 
            'callNo':randrange(1000), 
            'status':randrange(4), 
            'link':'/record/'+str(i),
            'updatedAt': '2019-12-'+str(randrange(30)) ,
            'desc':'Description of Operation', 
            '_actions': ['edit']
        }
    for i in range(num_records) ]

def on_view(item):
    print(item)

def on_edit(item):
    print(item)

def on_page(query):
    print(query)
    import time
    time.sleep(2) # mock data loading time
    return TableResult(mock_table_data(5), 1000, query['current_page'])

def on_modal_form_submit(form_data):
    print(form_data)
    return CloseModalForm()

def on_new_button():
    return ShowModalForm('New Item', [
        TextField('Title', required_message='Title is required!'),
        TextArea('Description'),
    ], on_submit=on_modal_form_submit)

@app.page('/', 'Table')
def table_page():
    return [
        Card(content = [
            DataTable("Example Table", columns=table_columns, 
                data=TableResult(mock_table_data(5), 1000), on_data=on_page,
                filter_form=FilterForm([
                    TextField('Rule Name'),
                    TextField('Description'),
                    SelectBox('Type', data=['One', 'Two', 'Three'], placeholder="Select One"),
                    RadioGroup('Radio - Button', data=[['One', 1], ['Two', 2]], format='button'),
                ], submit_text='Filter', reset_text='Clear'),
                row_actions=[
                    TableRowAction('edit', icon='edit', on_click=on_edit),
                ],
                table_actions=[
                    Button('New', style='primary', on_click=on_new_button),
                ])
        ])
    ]
 

if __name__ == '__main__':
    app.run()