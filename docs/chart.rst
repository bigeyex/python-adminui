Use Charts
============================

``LineChart`` takes a list of of the data (numbers, will be the x axis), 
and a list of the lables::

   chart_labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   chart_data = [1.5, 2.3, 4.3, 2.2, 5.1, 6.5, 2.3, 2.3, 2.2, 1.1]
   LineChart(chart_data, chart_labels)

the same goes for ``BarChart`` and ``PieChart``

An example with chart is listed here:
https://github.com/bigeyex/python-adminui/blob/master/python/example_chart.py
https://github.com/bigeyex/python-adminui/blob/master/python/example_dash.py

.. autoclass:: adminui.BarChart
   :members:

.. autoclass:: adminui.LineChart
   :members: