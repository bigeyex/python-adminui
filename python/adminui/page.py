from inspect import signature 

class Page:
    def __init__(self, url, name, builder, auth_group=None, description=''):
        self.name = name
        self.url = url
        self.auth_group = auth_group
        self.builder = builder
    
    def as_list(self, param=''):
        def call_builder():
            if len(signature(self.builder).parameters) > 0:
                return self.builder(param)
            else:
                return self.builder()
        return {
            'name': self.name,
            'content': [x.as_dict() for x in call_builder()]
        }