import { Card, Col, Row, Tooltip, Icon } from "antd";
import ChartCard from "./components/ChartCard"
import React from "react";
import renderElements, { ElementProps } from './element';

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