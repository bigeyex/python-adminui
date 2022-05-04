from random import randrange
from adminui import *

app = AdminApp()

table_columns = [
    {'title': 'Rule Name', 'dataIndex': 'name'},
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
    return TableResult(mock_table_data(5), 1000, query['current_page'])

@app.page('/', 'Table')
def table_page():
    return [
        Card(content = [
            DataTable("Example Table", columns=table_columns, 
                data=TableResult(mock_table_data(5), 1000), on_data=on_page,
                row_actions=[
                    TableRowAction('edit', 'Edit', on_click=on_edit),
                ],
                table_actions=[
                    Button('New', style='primary'),
                ])
        ])
    ]
 

if __name__ == '__main__':
    app.run()