from adminui import *

app = AdminApp()

chart_labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
chart_data = [1.5, 2.3, 4.3, 2.2, 5.1, 6.5, 2.3, 2.3, 2.2, 1.1]
chart_data2 = [6.5, 2.3, 2.3, 2.2, 1.1, 1.5, 2.3, 4.3, 2.2, 5.1]

@app.page('/', 'Dashboard')
def form_page():
    return [
        Row([
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx', height=50,
                    content=[BarChart(chart_data, chart_labels, show_axis=False, height=50)],
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx', height=50,
                    content=[LineChart(chart_data, chart_labels, show_axis=False, show_area=True, show_line=False, height=50)],
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx', height=50,
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx', height=50,
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
        ]),
        Card(content=[
            Row([
                Column([
                    BarChart(chart_data, chart_labels),
                    LineChart({'series1': chart_data, 'series2': chart_data2}, chart_labels),
                ], size=3),
                Column([])
            ])
        ]),
    ]

if __name__ == '__main__':
    app.run()
