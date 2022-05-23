Use Charts
============================

Line Chart
**********

``LineChart`` takes a list of of the data (numbers, will be the x axis), 
and a list of the lables::

   chart_labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   chart_data = [1.5, 2.3, 4.3, 2.2, 5.1, 6.5, 2.3, 2.3, 2.2, 1.1]
   LineChart(chart_data, chart_labels)

You may put more than 1 series on the line chart::

   LineChart({'series1': chart_data, 'series2': chart_data2}, chart_labels)

set ``show_area=True`` to fill the area of the chart, and set ``smooth=False`` to stop 
smoothing the line.

You may set the ``height`` in every type of chart.

.. autoclass:: adminui.LineChart
   :members:

Bar Chart
**********

Basic usage::

   BarChart(chart_data, chart_labels)

Multiple bars will be put side-by-side. Stack them with ``stack=True``::

   BarChart({'series1': chart_data, 'series2': chart_data2}, chart_labels, stack=True),

.. autoclass:: adminui.BarChart
   :members:

Pie Chart
**********

Basic usage::

   PieChart(chart_data, chart_labels)

.. autoclass:: adminui.PieChart
   :members:

Scatter Plot
************

Scatter Plot takes ``x``, ``y`` series, and optionally ``size`` and ``color``
(both can be a constant or an array of data)::

   ScatterPlot(list_of_x, list_of_y),
   ScatterPlot(list_of_x, list_of_y, color=list_of_color_data, size=list_of_size_data),


.. autoclass:: adminui.ScatterPlot
   :members:


An example with chart is listed here:
https://github.com/bigeyex/python-adminui/blob/master/python/example_chart.py
https://github.com/bigeyex/python-adminui/blob/master/python/example_dash.py


