import uuid

class Element:
    """The base class of all page elements"""
    def __init__(self, type_, content=None, **kwargs):
        self.fields = ['uuid', 'type']
        for key, value in kwargs.items():
            self.fields.append(key)
            setattr(self, key, value)
        self.uuid = str(uuid.uuid1())
        self.type = type_
        self.content = content
        # element_fields are fields with Element as values, e.g. TableList.data
        self.element_fields = []
        # components_fields are fields that have child elements, e.g. Card.content
        if self.content is not None:
            self.components_fields = ['content']
        else:
            self.components_fields = []

    def as_dict(self):
        result = {}
        for field in self.fields:
            if getattr(self, field) is not None:
                result[field] = getattr(self, field)
        for field in self.components_fields:
            if getattr(self, field) is not None:
                result[field] = [x.as_dict() for x in getattr(self, field)]
        for field in self.element_fields:
            result[field] = getattr(self, field).as_dict()
        return result
