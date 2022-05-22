import { ElementProps, elementComponentRegistry } from '@/models/page';
import React from  "react"
import { Progress, Spin } from 'antd';
import renderElements from './element';


elementComponentRegistry['Progress'] = ({spec, dispatch, passDown}) => (
    <Progress percent={spec.value} status={spec.style.status} type={spec.format} width={spec.style.width} showInfo={spec.style.showInfo}/>
)

elementComponentRegistry['Spin'] = ({spec, dispatch, passDown}) => (
    <Spin size={spec.size} tip={spec.title}>
        { renderElements(spec.content!, dispatch, passDown) }
    </Spin>
)