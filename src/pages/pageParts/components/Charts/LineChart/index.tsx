import { Axis, Chart, Geom, Tooltip, AxisProps } from 'bizcharts';

import React from 'react';
import autoHeight from '../autoHeight';

export interface MiniAreaProps {
  color?: string;
  height?: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: AxisProps;
  forceFit?: boolean;
  scale?: {
    x?: {
      tickCount: number;
    };
    y?: {
      tickCount: number;
    };
  };
  yAxis?: Partial<AxisProps>;
  borderWidth?: number;
  data: {
    x: number | string;
    y: number;
  }[];
  chartStyle: LineChartStyle;
  padding?: any;
}

export interface LineChartStyle {
  height: number;
  columns?: string[];
  line_color?: string;
  show_area?: boolean;
  show_axis?: boolean;
  show_line?: boolean;
  smooth?: boolean;
}


const MiniArea: React.FC<MiniAreaProps> = props => {
  const {
    data = [],
    color = 'rgba(24, 144, 255, 0.2)',
    borderColor = '#1089ff',
    scale = { x: {}, y: {} },
    borderWidth = 2,
    xAxis,
    yAxis,
    animate = true,
    chartStyle,
    padding,
  } = props;


  const scaleProps = {
    x: {
      type: 'cat',
      range: [0, 1],
      ...scale.x,
    },
    y: {
      min: 0,
      ...scale.y,
    },
  };

  const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
    'x*y',
    (x: string, y: string) => ({
      name: x,
      value: y,
    }),
  ];

  const chartHeight = chartStyle.height + 54;

  if (!chartStyle.columns || chartStyle.columns.length < 2) {
    chartStyle.columns = ['x', 'y'];
  }

  return (
    <div style={{ 'height': chartStyle.height }}>
      <div>
        {chartStyle.height > 0 && (
          <Chart
            animate={animate}
            scale={scaleProps}
            height={chartHeight}
            forceFit
            data={data}
            padding={padding || 'auto'}
          >
            {chartStyle.show_axis ? 
              <Axis
                name={chartStyle.columns[0]}
                {...xAxis}
              />
            : undefined}
            {chartStyle.show_axis ? 
              <Axis
                name={chartStyle.columns[1]}
                {...yAxis}
              />
            : undefined}
            <Tooltip showTitle={false} crosshairs={false} />
            {chartStyle.show_area ? 
              <Geom
                type="area"
                position={chartStyle.columns[0]+"*"+chartStyle.columns[1]}
                color={color}
                tooltip={tooltip}
                shape={chartStyle.smooth?"smooth":undefined}
                style={{
                  fillOpacity: 1,
                }}
              />
            : undefined}
            {chartStyle.show_line ? 
              <Geom
                type="line"
                position={chartStyle.columns[0]+"*"+chartStyle.columns[1]}
                shape={chartStyle.smooth?"smooth":undefined}
                color={borderColor}
                size={borderWidth}
                tooltip={false}
              />
            : undefined}
          </Chart>
        )}
      </div>
    </div>
  );
};

export default autoHeight()(MiniArea);
