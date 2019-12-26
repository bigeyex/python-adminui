from adminui import *

app = AdminApp()

visit_data = [
    {
        "x": "2019-12-25",
        "y": 7
    },
    {
        "x": "2019-12-26",
        "y": 5
    },
    {
        "x": "2019-12-27",
        "y": 4
    },
    {
        "x": "2019-12-28",
        "y": 2
    },
    {
        "x": "2019-12-29",
        "y": 4
    },
    {
        "x": "2019-12-30",
        "y": 7
    },
    {
        "x": "2019-12-31",
        "y": 5
    },
    {
        "x": "2020-01-01",
        "y": 6
    },
    {
        "x": "2020-01-02",
        "y": 5
    },
    {
        "x": "2020-01-03",
        "y": 9
    },
    {
        "x": "2020-01-04",
        "y": 6
    },
    {
        "x": "2020-01-05",
        "y": 3
    },
    {
        "x": "2020-01-06",
        "y": 1
    },
    {
        "x": "2020-01-07",
        "y": 5
    },
    {
        "x": "2020-01-08",
        "y": 3
    },
    {
        "x": "2020-01-09",
        "y": 6
    },
    {
        "x": "2020-01-10",
        "y": 5
    }
]

offline_chart_data = [
    {
        "x": 1577254363300,
        "y1": 93,
        "y2": 26
    },
    {
        "x": 1577256163300,
        "y1": 83,
        "y2": 91
    },
    {
        "x": 1577257963300,
        "y1": 71,
        "y2": 28
    },
    {
        "x": 1577259763300,
        "y1": 24,
        "y2": 54
    },
    {
        "x": 1577261563300,
        "y1": 57,
        "y2": 92
    },
    {
        "x": 1577263363300,
        "y1": 21,
        "y2": 57
    },
    {
        "x": 1577265163300,
        "y1": 92,
        "y2": 22
    },
    {
        "x": 1577266963300,
        "y1": 60,
        "y2": 21
    },
    {
        "x": 1577268763300,
        "y1": 24,
        "y2": 80
    },
    {
        "x": 1577270563300,
        "y1": 12,
        "y2": 51
    },
    {
        "x": 1577272363300,
        "y1": 40,
        "y2": 33
    },
    {
        "x": 1577274163300,
        "y1": 13,
        "y2": 46
    },
    {
        "x": 1577275963300,
        "y1": 31,
        "y2": 47
    },
    {
        "x": 1577277763300,
        "y1": 28,
        "y2": 52
    },
    {
        "x": 1577279563300,
        "y1": 46,
        "y2": 48
    },
    {
        "x": 1577281363300,
        "y1": 107,
        "y2": 25
    },
    {
        "x": 1577283163300,
        "y1": 68,
        "y2": 53
    },
    {
        "x": 1577284963300,
        "y1": 92,
        "y2": 78
    },
    {
        "x": 1577286763300,
        "y1": 108,
        "y2": 95
    },
    {
        "x": 1577288563300,
        "y1": 35,
        "y2": 28
    }
]

@app.page('/', 'Dashboard')
def form_page():
    return [
        Row([
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx', height=50,
                    content=[BarChart(visit_data, show_axis=False, height=50)],
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx', height=50,
                    content=[LineChart(visit_data, show_axis=False, show_area=True, show_line=False, height=50)],
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
                    BarChart(visit_data),
                    LineChart(visit_data, show_area=True),
                ], size=3),
                Column([])
            ])
        ]),
    ]

if __name__ == '__main__':
    app.run()
