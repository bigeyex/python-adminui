from random import randrange
from adminui import *

app = AdminApp()

table_columns = [
    {'title': 'Rule Name', 'dataIndex': 'name'},
    {'title': 'Description', 'dataIndex': 'desc'},
    {'title': '# of Calls', 'dataIndex': 'callNo'},
    {'title': 'Status', 'dataIndex': 'status'},
    {'title': 'Updated At', 'dataIndex': 'updatedAt'}
]

table_data = [
    {'id':1, 'name':"Alpha", 'callNo':randrange(1000), 'status':randrange(4), 
        'updatedAt': '2019-12-'+str(randrange(30)) ,'desc':'Description of Operation'},
    {'id':2, 'name':"Alpha", 'callNo':randrange(1000), 'status':randrange(4), 
        'updatedAt': '2019-12-'+str(randrange(30)) ,'desc':'Description of Operation'},
    {'id':3, 'name':"Alpha", 'callNo':randrange(1000), 'status':randrange(4), 
        'updatedAt': '2019-12-'+str(randrange(30)) ,'desc':'Description of Operation'},
    {'id':4, 'name':"Alpha", 'callNo':randrange(1000), 'status':randrange(4), 
        'updatedAt': '2019-12-'+str(randrange(30)) ,'desc':'Description of Operation'},
    {'id':5, 'name':"Alpha", 'callNo':randrange(1000), 'status':randrange(4), 
        'updatedAt': '2019-12-'+str(randrange(30)) ,'desc':'Description of Operation'},
]

def on_subscribe(item):
    print(item)

def on_config(item):
    print(item)

app.add_page(Page('/', 'table', 
    [
        Card(content = [
            TableList("Example Table", columns=table_columns, data=table_data, 
                row_actions=[
                    Link('Config', on_click=on_config),
                    Link('Subscribe', on_click=on_subscribe)
                ],
                table_actions=[
                    Button('New', style='primary', link_to='/new_item')  
                ])
        ])
    ]
))
 

if __name__ == '__main__':
    app.run()