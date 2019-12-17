class Page:
    def __init__(self, url, name, content, description=''):
        self.name = name
        self.url = url
        self.content = content
    
    def as_list(self):
        return {
            'name': self.name,
            'content': [x.as_dict() for x in self.content]
        }