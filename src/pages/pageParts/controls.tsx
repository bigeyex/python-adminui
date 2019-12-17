import { Button } from "antd";
import React from "react";
import { ElementProps } from './element';

type ButtonType = "link" | "default" | "ghost" | "primary" | "dashed" | "danger" | undefined;


export const ButtonPart = ({ spec, dispatch }:ElementProps) => (
    <Button icon={ spec.icon } type={ spec.style as ButtonType }
        onClick={(e)=>{ dispatch({
                type: 'page/submitAction',
                payload: {
                    action: 'on_click',
                    cb_uuid: spec.on_click
                }
            }); }}>
        { spec.title }</Button>
);

export const LinkPart = ({ spec, dispatch }:ElementProps) => (
    <a onClick={(e)=>{ dispatch({
                type: 'page/submitAction',
                payload: {
                    action: 'on_click',
                    cb_uuid: spec.on_click
                }
            }); }}>
        { spec.title }</a>
);