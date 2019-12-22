from adminui import *

app = AdminApp()

@app.page('/', 'Dashboard')
def form_page():
    return [
        Row([
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx',
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx',
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx',
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
            Column([
                ChartCard('Total Sales', '$126,560', 'The total sales number of xxx',
                    footer=[Statistic('Daily Sales', '$12423', inline=True)])
            ]),
        ])
    ]

if __name__ == '__main__':
    app.run()