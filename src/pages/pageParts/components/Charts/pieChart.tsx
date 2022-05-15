import { Chart, Geom, Tooltip, Coord, Label } from 'bizcharts';

import React from 'react';
import autoHeight from './autoHeight';
import { transformChartData } from '@/utils/chart';
import { transform } from 'lodash';

export interface PieChartProps {
    data: [];
    labels?: any;
    chartStyle: PieChartStyle;
    height?: number;
}

export interface PieChartStyle {
    height: number;
    columns?: string[];
  }
  

const PieChart: React.FC<PieChartProps> = props => {

    let {
        data = [],
        labels,
        chartStyle,
    } = props;

    const chartData = transformChartData(data, labels);

    return (
        <Chart
          data={chartData}
          forceFit
          height={chartStyle.height}
        >
          <Coord type="theta"/>
          <Tooltip showTitle={false} />
          <Geom
            type="intervalStack"
            position="y"
            color="x"
          >
            <Label content="x" />
                      </Geom>
        </Chart>
      );

}

export default autoHeight()(PieChart);