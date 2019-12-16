from flask import Flask, jsonify, request
from werkzeug.routing import BaseConverter
from .page import Page

class PurePathConverter(BaseConverter):
    regex = r'[a-zA-Z0-9\/]+'

class AdminApp:
    def __init__(self):
        self.app = Flask(__name__, static_url_path='/')
        self.app.url_map.converters['purePath'] = PurePathConverter 
        self.pages = {}
        self.uuid_page_map = {}

    def add_page(self, page):
        self.pages[page.url] = page
        self.uuid_page_map.update(page.saved_items())

    def page(self, url, name):
        def decorator(func):
            self.pages[url] = Page(url, name, func())
        return decorator
    
    def serve_page(self, url=''):
        url = '/'+url
        if url in self.pages:
            return jsonify(self.pages[url].as_list())
        else:
            return 'error'

    def handle_page_action(self):
        msg = request.get_json()
        if msg['uuid'] in self.uuid_page_map:
            el = self.uuid_page_map[msg['uuid']]
            if msg['action'] == 'form_submit':
                if el.on_submit is not None:
                    el.on_submit(msg['values'])
        return 'ok'

    def serve_menu(self):
        return jsonify([])

    def serve_root(self, path=''):
        return self.app.send_static_file('index.html')
    
    def mock_current_user(self):
        return jsonify({
            'name': 'Serati Ma'
        })

    def run(self):
        self.app.route('/api/page_layout/<url>')(self.serve_page)
        self.app.route('/api/page_layout/<url>/')(self.serve_page)
        self.app.route('/api/page_layout/')(self.serve_page)
        self.app.route('/api/currentUser')(self.mock_current_user)
        self.app.route('/api/main_menu')(self.serve_menu)
        self.app.route('/api/page_action', methods=['POST'])(self.handle_page_action)
        self.app.route('/')(self.serve_root)
        self.app.route('/<purePath:path>/')(self.serve_root)
        self.app.run()