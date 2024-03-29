import { Button, Switch, Checkbox, Slider } from "antd";
import React from "react";
import { ElementProps, elementComponentRegistry } from '@/models/page';
import { PageElement } from "@/models/page";
import { Dispatch } from 'redux';
import renderElements from "./element";

type ButtonType = "link" | "default" | "ghost" | "primary" | "dashed" | "danger" | undefined;


export const ButtonPart = ({ spec, dispatch }:ElementProps) => (
    <Button key={spec.uuid} icon={ spec.icon } type={ spec.style as ButtonType }
        href={spec.link_to ? spec.link_to : undefined}
        onClick={(e)=>{ if('on_click' in spec) dispatch({
                type: 'page/submitAction',
                payload: {
                    action: 'on_click',
                    cb_uuid: spec.on_click
                }
            }); }}>
        { spec.title }</Button>
);
elementComponentRegistry['Button'] = ButtonPart

export const LinkPart = ({ spec, dispatch, passDown }:ElementProps) => (
    <a  href={spec.link_to ? spec.link_to : undefined}
        onClick={(e)=>{ if('on_click' in spec) dispatch({
                type: 'page/submitAction',
                payload: {
                    action: 'on_click',
                    cb_uuid: spec.on_click
                }
            }); }}>
        { spec.title } { renderElements(spec.content || [], dispatch, passDown)  }</a>
);
elementComponentRegistry['Link'] = LinkPart

const handleChange = (spec:PageElement, dispatch:Dispatch<any>) => {
    return (value:any) => {     
        if('on_change' in spec) dispatch({
            type: 'page/submitAction',
            payload: {
                cb_uuid: spec.on_change,
                args: [ value ]
            }
        });
    }
}


export const CheckboxPart = ({ spec, passDown, dispatch }:ElementProps) => {
    return <Checkbox name={spec.name} onChange={spec.on_change ? handleChange(spec, dispatch) : undefined} disabled={spec.disabled}>{spec.title}</Checkbox>
}
elementComponentRegistry['Checkbox'] = CheckboxPart

export const SwitchPart = ({ spec, passDown, dispatch }:ElementProps) => {
    return <Switch onChange={spec.on_change ? handleChange(spec, dispatch) : undefined} defaultChecked={spec.value as any as boolean} disabled={spec.disabled}/>
}
elementComponentRegistry['Switch'] = SwitchPart

export const SliderPart = ({ spec, passDown, dispatch }:ElementProps) => {
    return <Slider onChange={spec.on_change ? handleChange(spec, dispatch) : undefined} defaultValue={spec.value} max={spec.max} min={spec.min} range={spec.range}/>
}
elementComponentRegistry['Slider'] = SliderPart