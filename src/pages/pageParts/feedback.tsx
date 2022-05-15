import { ElementProps, elementComponentRegistry } from '@/models/page';
import React from  "react"
import { Progress } from 'antd';

elementComponentRegistry['Progress'] = ({spec, dispatch, passDown}) => (
    <Progress percent={spec.value} status={spec.style.status} type={spec.format} width={spec.style.width} showInfo={spec.style.showInfo}/>
)