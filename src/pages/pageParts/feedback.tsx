import { ElementProps, elementComponentRegistry } from '@/models/page';
import React from  "react"
import { Progress, Spin, Empty, Result, Popconfirm, Tooltip } from 'antd';
import renderElements from './element';
import { ResultStatusType } from 'antd/lib/result';


elementComponentRegistry['Progress'] = ({spec, dispatch, passDown}) => (
    <Progress percent={spec.value} status={spec.style.status} type={spec.format} width={spec.style.width} showInfo={spec.style.showInfo}/>
)

elementComponentRegistry['Spin'] = ({spec, dispatch, passDown}) => (
    <Spin size={spec.size} tip={spec.title}>
        { renderElements(spec.content!, dispatch, passDown) }
    </Spin>
)

elementComponentRegistry['Empty'] = ({spec, dispatch, passDown}) => (
    <Empty description={spec.title ? spec.title : undefined}
           image={spec.style.simple ? Empty.PRESENTED_IMAGE_SIMPLE : undefined}
            >
        { renderElements(spec.content!, dispatch, passDown) }
    </Empty>
)

elementComponentRegistry['Result'] = ({spec, dispatch, passDown}) => (
    <Result title={spec.title} subTitle={spec.subTitle} status={spec.status as ResultStatusType}
            extra={ renderElements(spec.extra!, dispatch, passDown) }
            >
        { renderElements(spec.content!, dispatch, passDown) }
    </Result>
)

elementComponentRegistry['Popconfirm'] = ({spec, dispatch, passDown}) => (
    <Popconfirm 
        title={spec.title} 
        onConfirm={(e)=>{ if('on_submit' in spec) dispatch({
            type: 'page/submitAction',
            payload: {
                action: 'on_submit',
                cb_uuid: spec.on_submit,
                args: [ spec.data ]
            }
        }); }}
        okText={spec.style.ok_text}
        cancelText={spec.style.cancel_text}
    >
        { renderElements(spec.content!, dispatch, passDown) }
    </Popconfirm>
)

elementComponentRegistry['Tooltip'] = ({spec, dispatch, passDown}) => (
    <Tooltip 
        title={spec.title} 
        placement={spec.style.placement}
    >
        { renderElements(spec.content!, dispatch, passDown) }
    </Tooltip>
)