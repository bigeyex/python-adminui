import { Card, Col, Row, Statistic, Tooltip, Icon } from "antd";
import ChartCard from "./components/ChartCard"
import React, { Fragment } from "react";
import renderElements, { ElementProps } from './element';
import Trend from './components/Trend'

import styles from './layout.less';

export const CardPart = ({ spec, dispatch }:ElementProps) => (
    <Card bordered={false}>
        {renderElements(spec.content || [], dispatch)}
    </Card>
);

export const ChartCardPart = ({ spec, dispatch }:ElementProps) => (
    <ChartCard bordered={false} title={spec.title} action={
        spec.tooltip ? (<Tooltip title={spec.tooltip}><Icon type="info-circle-o" /></Tooltip>) : null }
        total={spec.value}
        footer={renderElements(spec.footer || [], dispatch)}>
        {renderElements(spec.content || [], dispatch)}
    </ChartCard>
);

export const RowPart = ({ spec, dispatch }:ElementProps) => {
    const content = spec.content || [];
    let columns = null;
    if(content.length > 0) {
        let maxSize = 0;
        content.forEach(col => {
            maxSize += col.size || 1;
        });
        columns = content.map(col => {
            const responsiveProps = {
                xs: 24,
                sm: 12,
                md: 12,
                lg: 12,
                xl: Math.floor(24*(col.size || 1)/maxSize),
                style: { marginBottom: 24 },
            }
            return <Col {...responsiveProps} key={col.uuid}>{ renderElements(col.content || [], dispatch) }</Col>
        });
    }
    return <Row gutter={24} type="flex">{ columns }</Row>
}

export const StatisticPart = ({ spec, dispatch }:ElementProps) => {
    if(spec.inline) {
        const value = Number((spec.value as string).replace(/[^0-9.-]+/g,""));
        if(spec.show_trend && value != 0) {
            return <Trend flag={ value>0 ? 'up' : 'down' } style={{ marginRight: 16 }}>
                {spec.title} <span className={styles.trendText}>{spec.value}</span>
            </Trend>
        }
        else {
            return <Fragment>
                {spec.title} <span className={styles.trendText}>{spec.value}</span>
            </Fragment>
        }
    }
    else {
        return <Statistic title={spec.title} value={spec.value}/>
    }
};
