import { Card, Col, Row, Statistic, Tooltip, Icon, Tabs } from "antd";
import ChartCard from "./components/ChartCard"
import React, { Fragment, useEffect } from "react";
import renderElements from './element';
import { ElementProps, elementComponentRegistry } from '@/models/page';
import Trend from './components/Trend'

import styles from './layout.less';
import { postPageAction } from "@/services/page";

export const CardPart = ({ spec, dispatch, passDown }:ElementProps) => (
    <Card key={spec.uuid} bordered={false}>
        {renderElements(spec.content || [], dispatch, passDown)}
    </Card>
);
elementComponentRegistry['Card'] = CardPart

export const ChartCardPart = ({ spec, dispatch, passDown }:ElementProps) => (
    <ChartCard bordered={false} title={spec.title} action={
        spec.tooltip ? (<Tooltip title={spec.tooltip}><Icon type="info-circle-o" /></Tooltip>) : null }
        key={spec.uuid}
        total={spec.value}
        contentHeight={46}
        footer={renderElements(spec.footer || [], dispatch, passDown)}>
        {renderElements(spec.content || [], dispatch, passDown)}
    </ChartCard>
);
elementComponentRegistry['ChartCard'] = ChartCardPart

export const RowPart = ({ spec, dispatch, passDown }:ElementProps) => {
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
            return <Col {...responsiveProps} key={col.uuid}>{ renderElements(col.content || [], dispatch, passDown) }</Col>
        });
    }
    return <Row gutter={24} type="flex">{ columns }</Row>
}
elementComponentRegistry['Row'] = RowPart

export const StatisticPart = ({ spec }:ElementProps) => {
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
elementComponentRegistry['Statistic'] = StatisticPart

elementComponentRegistry['Image'] = ({ spec }:ElementProps) => {
    return <img src={spec.url} alt={spec.title} style={{width: spec.style.width}} key={spec.uuid} />
}


elementComponentRegistry['Icon'] = ({ spec }:ElementProps) => {
    console.log(spec);
    return <Icon type={spec.name} style={{fontSize: spec.size, color: spec.style.color}} spin={spec.style.spin}
                rotate={spec.style.rotate} twoToneColor={spec.style.color} key={spec.uuid}/>
}

elementComponentRegistry['Group'] = ({ spec, dispatch, passDown }:ElementProps) => {
    return <div key={spec.uuid}>{ renderElements(spec.content || [], dispatch, passDown) }</div>
}

elementComponentRegistry['Tabs'] = ({ spec, dispatch, passDown }:ElementProps) => {
    const { TabPane } = Tabs;
    return <Tabs key={spec.uuid} tabPosition={spec.style.position} type={spec.format} size={spec.size}>
        { spec.content?.map( (tab) => (
            <TabPane tab={tab.name} key={tab.uuid}>
                { renderElements([tab] || [], dispatch, passDown) }
            </TabPane>
        ) )}
    </Tabs>
}

function TimerPart({ spec, dispatch }:ElementProps){
    useEffect( () => {
        const timer = setInterval(() => {
            dispatch({
                type: 'page/submitAction',
                payload: {
                    cb_uuid: spec.on_change,
                    args: [ spec.data ]
                }
            });
        }, 1000 * spec.interval!);
        return () => { clearInterval(timer) }
    } )
    return null;
}
elementComponentRegistry['Timer'] =  ({ spec, dispatch, passDown }:ElementProps) => (<TimerPart key={spec.uuid} spec={spec} dispatch={dispatch} passDown={passDown}/>)