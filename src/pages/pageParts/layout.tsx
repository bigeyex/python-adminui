import { Card } from "antd";
import React from "react";
import renderElements, { ElementProps } from './element';

export const CardPart = ({ spec, dispatch }:ElementProps) => (
    <Card bordered={false}>
        {renderElements(spec.content || [], dispatch)}
    </Card>
);
