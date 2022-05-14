from inspect import signature 

class Page:
    def __init__(self, url, name, builder, auth_needed=None, description=''):
        self.name = name
        self.url = url
        self.auth_needed = auth_needed
        self.builder = builder
    
    def as_list(self, param='', all_params=None):
        def call_builder():
            num_func_params = len(signature(self.builder).parameters)
            if num_func_params > 1:
                return self.builder(param, all_params)
            elif num_func_params > 0:
                return self.builder(param)
            else:
                return self.builder()
        return {
            'name': self.name,
            'content': call_builder()
        }