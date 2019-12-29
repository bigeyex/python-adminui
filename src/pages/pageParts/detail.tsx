import { Descriptions, Divider } from "antd";
import React from "react";
import renderElements, { ElementProps } from './element';

export const DetailGroupPart = ({ spec, dispatch, passDown }:ElementProps) => (
    <Descriptions
            title={spec.title}
            style={{
              marginBottom: 32,
            }}
          >
        {renderElements(spec.content || [], dispatch, passDown)}
    </Descriptions>
);

export const DividerPart = () => (
    <Divider
        style={{
            marginBottom: 32,
        }}
        />
);

export const HeaderPart = ({ spec }:ElementProps) => {
    switch(spec.level){
        case 1:
            return <h1 style={{ marginBottom: 16 }}>{spec.text}</h1>;
            break;
        case 2:
            return <h2 style={{ marginBottom: 16 }}>{spec.text}</h2>;
            break;
        case 3:
            return <h3 style={{ marginBottom: 16 }}>{spec.text}</h3>;
            break;
        default:
            return <h4 style={{ marginBottom: 16 }}>{spec.text}</h4>;
    }
};

export const ParagraphPart = ({ spec }:ElementProps) => (
    <p>{spec.text}</p>
)