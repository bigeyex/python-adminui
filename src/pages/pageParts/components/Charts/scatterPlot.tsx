import { Chart, Geom, Tooltip, Label, Axis, Legend } from 'bizcharts';

import React from 'react';
import autoHeight from './autoHeight';
import { transformChartData } from '@/utils/chart';
import { transform } from 'lodash';
import { hasPrefixSuffix } from 'antd/lib/input/ClearableLabeledInput';

export interface ScatterPlotProps {
    data: {x: [], y: []};
    labels: {x: string, y: string, color ?:string, size ?:string};
    chartStyle: ScatterPlotStyle;
    height?: number;
}

export interface ScatterPlotStyle {
    height: number;
    color: string | number[];
    size: string | number[];
    opacity: number;
  }
  

const ScatterPlot: React.FC<ScatterPlotProps> = props => {

    let {
        data,
        labels,
        chartStyle,
    } = props;

    const hasColorSeries = Array.isArray(chartStyle.color);
    const hasSizeSeries = Array.isArray(chartStyle.size);

    const chartData = data.x.map((x, i)=> {
        let dataPoint:{x:any, y:any, c?:any, s?:any} = {x: x, y: data.y[i]}
        if (hasColorSeries) {
            dataPoint.c = chartStyle.color[i];
        }
        if (hasSizeSeries) {
            dataPoint.s = chartStyle.size[i];
        }
        return dataPoint;
    })

    const cols = {
        x: {alias: labels.x || 'x'},
        y: {alias: labels.y || 'y'},
    }
    if (hasColorSeries) cols['c'] = {alias: labels.color || 'color'};
    if (hasSizeSeries) cols['s'] =  {alias: labels.size || 'size'};

    return (
        <Chart
          data={chartData}
          scale={cols} 
          forceFit
          height={chartStyle.height}
        >
          <Axis name="x" />
          <Axis name="y" />
          <Tooltip showTitle={false} />
          <Legend />
          <Geom
            type="point"
            position="x*y"
            tooltip = {'x*y' + (hasColorSeries ? '*c' : '') + (hasSizeSeries ? '*s' : '')}
            color={hasColorSeries ? 'c' : chartStyle.color as string || undefined}
            size={hasSizeSeries ? 's' : chartStyle.size as string || 3}
            shape="circle"
            opacity={chartStyle.opacity}
          >
          </Geom>
        </Chart>
      );

}

export default autoHeight()(ScatterPlot);