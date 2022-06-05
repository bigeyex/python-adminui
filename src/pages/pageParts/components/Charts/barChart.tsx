import { Axis, Chart, Geom, Tooltip, Legend } from 'bizcharts';
import React, { Component } from 'react';
import { transformChartData } from '@/utils/chart';

import Debounce from 'lodash.debounce';
import autoHeight from './autoHeight';

export interface BarProps {
  title?: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height?: number;
  data: [];
  labels?: any;
  forceFit?: boolean;
  autoLabel?: boolean;
  style?: React.CSSProperties;
  chartStyle: BarChartStyle;
}

type Color = [];

export interface BarChartStyle {
  color?: Color;
  height: number;
  stack?: boolean;
  show_axis?: boolean;
  columns?: string[];
}

class Bar extends Component<
  BarProps,
  {
    autoHideXLabels: boolean;
  }
> {
  state = {
    autoHideXLabels: false,
  };

  root: HTMLDivElement | undefined = undefined;

  node: HTMLDivElement | undefined = undefined;

  resize = Debounce(() => {
    if (!this.node || !this.node.parentNode) {
      return;
    }
    const canvasWidth = (this.node.parentNode as HTMLDivElement).clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }, 500);

  componentDidMount() {
    window.addEventListener('resize', this.resize, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = (n: HTMLDivElement) => {
    this.root = n;
  };

  handleRef = (n: HTMLDivElement) => {
    this.node = n;
  };

  render() {
    let {
      chartStyle,
      title,
      forceFit = true,
      data,
      labels,
      color = 'rgba(24, 144, 255, 0.85)',
      padding,
    } = this.props;

    if (chartStyle.color) {
      color = chartStyle.color;
    }

    const { autoHideXLabels } = this.state;

    const scale = {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    };

    const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
      'x*y',
      (x: string, y: string) => ({
        name: x,
        value: y,
      }),
    ];

    if (!chartStyle.columns || chartStyle.columns.length < 2) {
      chartStyle.columns = ['x', 'y'];
    }

    const chartData = transformChartData(data, labels);
    const dataHasGroups = chartData.length > 0 && 'c' in chartData[0];

    return (
      <div style={{ height: chartStyle.height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
          <Chart
            scale={scale}
            height={chartStyle.height}
            forceFit={forceFit}
            data={chartData}
            padding={padding || 'auto'}
          >
            <Legend />
            {chartStyle.show_axis ? (
              <Axis
                name={chartStyle.columns[0]}
                title={false}
                label={autoHideXLabels ? undefined : {}}
                tickLine={autoHideXLabels ? undefined : {}}
              />
            ) : (
              undefined
            )}
            {chartStyle.show_axis ? <Axis name={chartStyle.columns[1]} min={0} /> : undefined}
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom
              type={dataHasGroups && chartStyle.stack ? 'intervalStack' : 'interval'}
              position={chartStyle.columns[0] + '*' + chartStyle.columns[1]}
              color={dataHasGroups ? ['c', chartStyle.color] : color}
              tooltip={tooltip}
              adjust={[
                {
                  type: 'dodge',
                  marginRatio: 1 / 32,
                },
              ]}
            />
          </Chart>
        </div>
      </div>
    );
  }
}

export default autoHeight()(Bar);
