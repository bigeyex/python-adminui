import React from "react";
import { ElementProps, elementComponentRegistry } from '@/models/page';
import BarChart, { BarChartStyle } from './components/Charts/barChart'
import LineChart, { LineChartStyle } from './components/Charts/lineChart'
import PieChart, { PieChartStyle } from './components/Charts/pieChart'
import ScatterPlot, { ScatterPlotStyle } from './components/Charts/scatterPlot'


elementComponentRegistry['BarChart'] = ({ spec, dispatch }:ElementProps) => (
    <BarChart data={spec.data || []} labels={spec.labels} chartStyle={spec.style as BarChartStyle}/>
);

elementComponentRegistry['LineChart'] = ({ spec, dispatch }:ElementProps) => (
    <LineChart data={spec.data || []} labels={spec.labels} chartStyle={spec.style as LineChartStyle}/>
);

elementComponentRegistry['PieChart'] = ({ spec, dispatch }:ElementProps) => (
    <PieChart data={spec.data || []} labels={spec.labels} chartStyle={spec.style as PieChartStyle}/>
);

elementComponentRegistry['ScatterPlot'] = ({ spec, dispatch }:ElementProps) => (
    <ScatterPlot data={spec.data || []} labels={spec.labels} chartStyle={spec.style as ScatterPlotStyle}/>
);


