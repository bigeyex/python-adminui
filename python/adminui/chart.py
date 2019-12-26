from .element import Element

class BarChart(Element):
    """Create a bar chart
    
    Args:
        data: an array of dictionary as the chart's data. format:
            [{'x': <x_value>, 'y': <y_value>}, ...other data points]
        show_axis: True for displaying the x and y axis, labels and markers
        height: the height of the chart
    """
    def __init__(self, data=[], show_axis=True, height=300, color=None, columns=['x', 'y']):
        super().__init__('BarChart', data=data, style={'show_axis': show_axis, 'height': height, 'color': color, 'columns':columns})

class LineChart(Element):
    """Create a line chart
    
    Args:
        data: an array of dictionary as the chart's data. format:
            [{'x': <x_value>, 'y': <y_value>}, ...other data points]
        show_axis: True for displaying the x and y axis, labels and markers
        show_line: False for hiding the line, if you wish to make a pure-area chart
        show_area: True then the area below the line will be filled
        smooth: True then the line will be smoothed out
        height: the height of the chart
    """
    def __init__(self, data=[], show_axis=True, show_line=True, show_area=False, smooth=True, height=300, 
                        line_color=None, area_color=None, columns=['x', 'y']):
        super().__init__('LineChart', data=data, style={'show_axis': show_axis, 'show_line': show_line,
                            'show_area': show_area, 'smooth': smooth, 'height': height, 
                            'line_color': line_color, 'area_color': area_color, 'columns':columns})
