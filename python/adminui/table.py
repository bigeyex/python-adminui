from .element import Element

class TableList(Element):
    def __init__(self, title="", columns=[], data=[], row_actions=[],
            table_actions=[]):
        super().__init__('TableList', title=title, columns=columns, data=data,
            row_actions=row_actions, table_actions=table_actions, saved=True)
        self.components_fields = ['row_actions', 'table_actions']

