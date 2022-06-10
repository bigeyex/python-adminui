from .element import Element

class BarChart(Element):
    """Create a bar chart
    
    Args:
        data: the data shown on the chart. It can be: 
            a) an array like [2, 3, 4, 5]
            b) a dict of series, like { 'series1': [2, 3, 4, 5], 'series2': [6, 7, 8, 9] }
        labels: labels corresponding to the data. Must be to the same length of the data
            e.g. ['a', 'b', 'c', 'd']
        show_axis: True for displaying the x and y axis, labels and markers
        height: the height of the chart
        color: color as a string if data is a list else an array of colors
    """
    def __init__(self, data=[], labels=None, show_axis=True, height=300, color=None, columns=['x', 'y'], stack=False, id=None):
        if labels is None:  # only for compatability with old data format. Will be removed at 2.0.0
            labels = [d[columns[0]] for d in data]
            data = [d[columns[1]] for d in data]
        super().__init__('BarChart', data=data, labels=labels, style={'show_axis': show_axis, 'height': height, 'color': color, 'columns':columns, 'stack': stack}, id=id)

class LineChart(Element):
    """Create a line chart
    
    Args:
        data: the data shown on the chart. It can be: 
            a) an array like [2, 3, 4, 5]
            b) a dict of series, like { 'series1': [2, 3, 4, 5], 'series2': [6, 7, 8, 9] }
        labels: labels corresponding to the data. Must be to the same length of the data
            e.g. ['a', 'b', 'c', 'd']
        show_axis: True for displaying the x and y axis, labels and markers
        show_line: False for hiding the line, if you wish to make a pure-area chart
        show_area: True then the area below the line will be filled
        smooth: True then the line will be smoothed out
        height: the height of the chart
        line_color: line color as a string if data is a list else an array of colors
        area_color: area color as a string if data is a list else an array of colors
    """
    def __init__(self, data=[], labels=None, show_axis=True, show_line=True, show_area=False, smooth=True, height=300, 
                        line_color=None, area_color=None, columns=['x', 'y'], id=None):
        if labels is None: # only for compatability with old data format. Will be removed at 2.0.0
            labels = [d[columns[0]] for d in data]
            data = [d[columns[1]] for d in data]
        super().__init__('LineChart', data=data, labels=labels, style={'show_axis': show_axis, 'show_line': show_line,
                            'show_area': show_area, 'smooth': smooth, 'height': height, 
                            'line_color': line_color, 'area_color': area_color, 'columns':columns}, id=id)

class PieChart(Element):
    """Create a bar chart
    
    Args:
        data: the data shown on the chart. 
            e.g. an array like [2, 3, 4, 5]
        labels: labels corresponding to the data. Must be to the same length of the data
            e.g. ['a', 'b', 'c', 'd']
        height: the height of the chart
        title: the title of the chart
    """
    def __init__(self, data=[], labels=None, height=300, color=None, title=None, id=None):
        super().__init__('PieChart', data=data, labels=labels, style={'height': height, 'color': color, 'title': title}, id=id)

class ScatterPlot(Element):
    """Create a bar chart
    
    Args:
        x: data in the x axis e.g. an array like [2, 3, 4, 5]
        y: data in the y axis
        color: a) color of the points; b) a series of data shown as the color e.g. [1, 2, 1, 2]
        size: a) (int) size of data points; b) a series of data as the size e.g. [1, 2, 3, 1, 2, 3]
        labels: labels of the x, y axis
        height: the height of the chart
        opacity: the opacity of the data points
    """
    def __init__(self, x=[], y=[], labels={'x': 'x', 'y': 'y', 'color': 'color', 'size': 'size'}, height=300, color=None, size=3, opacity=0.65, id=None):
        super().__init__('ScatterPlot', data={'x': x, 'y': y}, labels=labels, style={'height': height, 'color': color, 'size': size, 'opacity':opacity}, id=id)
