import uuid

class Element:
    def __init__(self, type_, content=None, components={}, saved=False, **kwargs):
        self.fields = ['uuid', 'type']
        for key, value in kwargs.items():
            self.fields.append(key)
            setattr(self, key, value)
        self.uuid = str(uuid.uuid1())
        self.type = type_
        self.content = content
        if self.content is not None:
            self.components_fields = ['content']
        else:
            self.components_fields = []
        self.saved = saved

    def as_dict(self):
        result = {}
        for field in self.fields:
            result[field] = getattr(self, field)
        for field in self.components_fields:
            result[field] = [x.as_dict() for x in getattr(self, field)]
        return result

    def saved_items(self):
        result = {}
        if self.saved:
            result[self.uuid] = self
        for field in self.components_fields:
            for item in getattr(self, field):
                result.update(item.saved_items())
        return result

