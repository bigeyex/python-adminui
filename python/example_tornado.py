from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from adminui import *

app = AdminApp()

def on_submit(form_data):
    print(form_data)

@app.page('/', 'Detail Page')
def detail_page():
    return [
        Card(content=[
            Header('Header 1', 1),
        ])
    ]

if __name__ == '__main__':
    app.run()