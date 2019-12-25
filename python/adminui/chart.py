from .element import Element

class BarChart(Element):
    def __init__(self, data=[], show_axis=True, height=300, color=None, columns=['x', 'y']):
        super().__init__('BarChart', data=data, style={'show_axis': show_axis, 'height': height, 'color': color, 'columns':columns})

class LineChart(Element):
    def __init__(self, data=[], show_axis=True, show_line=True, show_area=False, smooth=True, height=300, 
                        line_color=None, area_color=None, columns=['x', 'y']):
        super().__init__('LineChart', data=data, style={'show_axis': show_axis, 'show_line': show_line,
                            'show_area': show_area, 'smooth': smooth, 'height': height, 
                            'line_color': line_color, 'area_color': area_color, 'columns':columns})
