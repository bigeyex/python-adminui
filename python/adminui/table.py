from .element import Element
from .app import callbackRegistry

class TableResult(Element):
    def __init__(self, data=[], total=None, current_page=1, page_size=10):
        if total == None:
            total = len(data)
            page_size = total
        super().__init__('TableResult', data=data, current_page=current_page, 
            total=total, page_size=page_size)
    def as_dict(self):
        return {
            'list': self.data,
            'pagination': {'total': self.total, 'pageSize': self.page_size, 'current': self.current_page}
        }
        
class TableRowAction(Element):
    def __init__(self, id, title, on_click):
        on_click_uuid = callbackRegistry.uuid_for_callback(on_click)
        super().__init__('TableRowAction', title=title, id=id, on_click=on_click_uuid)

class DataTable(Element):
    def __init__(self, title="", columns=[], data=[], row_actions=[],
            table_actions=[], on_data=None):
        on_data_uuid = callbackRegistry.uuid_for_callback(on_data)
        super().__init__('DataTable', title=title, columns=columns, data=data,
            row_actions=row_actions, table_actions=table_actions, on_data=on_data_uuid)
        self.components_fields = ['row_actions', 'table_actions']
        self.element_fields = ['data']

