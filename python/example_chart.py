from adminui import *

app = AdminApp()

chart_labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
chart_data = [1.5, 2.3, 4.3, 2.2, 5.1, 6.5, 2.3, 2.3, 2.2, 1.1]
chart_data2 = [6.5, 2.3, 2.3, 2.2, 1.1, 1.5, 2.3, 4.3, 2.2, 5.1]

@app.page('/', 'Dashboard')
def form_page():
    return [
        Card(content=[
            Row([
                Column([
                    PieChart(chart_data, chart_labels),
                    BarChart(chart_data, chart_labels),
                    LineChart(chart_data, chart_labels, show_area=True),
                    LineChart({'series1': chart_data, 'series2': chart_data2}, chart_labels),
                ], size=3),
                Column([
                    Progress(30),
                    Progress(30, format='circle')
                ])
            ])
        ]),
    ]

if __name__ == '__main__':
    app.run()
