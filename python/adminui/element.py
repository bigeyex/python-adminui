import uuid

class Element:
    """The base class of all page elements"""
    def __init__(self, type_, content=None, id=None, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
        self.uuid = str(uuid.uuid1())
        self.type = type_
        self.id = id
        self.content = content

    def as_dict(self):
        return {x:self.__dict__[x] for x in self.__dict__ if self.__dict__[x] is not None}
