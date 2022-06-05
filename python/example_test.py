from adminui import AdminApp, Group, LineChart, Paragraph, Tabs

app = AdminApp()


@app.page("/", "Chart Tab")
def chart_tab():
    chart_labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    chart_data = [1.5, 2.3, 4.3, 2.2, 5.1, 6.5, 2.3, 2.3, 2.2, 1.1]
    chart_data2 = [6.5, 2.3, 2.3, 2.2, 1.1, 1.5, 2.3, 4.3, 2.2, 5.1]
    return [
        Tabs(
            [
                Group(
                    name="Dashboard",
                    content=[
                        LineChart(
                            {"series1": chart_data, "series2": chart_data2},
                            chart_labels,
                        )
                    ],
                ),
                Group(name="Trigger Jobs", content=[Paragraph("ABC")]),
            ],
            size="large",
        )
    ]


if __name__ == "__main__":
    app.run()