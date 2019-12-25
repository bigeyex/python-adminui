import React from "react";
import { ElementProps } from './element';
import BarChart, { BarChartStyle } from './components/Charts/BarChart'
import LineChart, { LineChartStyle } from './components/Charts/LineChart'


export const BarChartPart = ({ spec, dispatch }:ElementProps) => (
    <BarChart data={spec.data || []} chartStyle={spec.style as BarChartStyle}/>
);

export const LineChartPart = ({ spec, dispatch }:ElementProps) => (
    <LineChart data={spec.data || []} chartStyle={spec.style as LineChartStyle}/>
);
