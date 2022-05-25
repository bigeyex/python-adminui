import { Descriptions, Divider } from "antd";
import React from "react";
import renderElements from './element';
import { ElementProps, elementComponentRegistry } from '@/models/page';
import nl2br from 'react-nl2br';

export const DetailGroupPart = ({ spec, dispatch, passDown }:ElementProps) => (
    <Descriptions
            title={spec.title}
            style={{
              marginBottom: 32,
            }}
            key={spec.uuid}
          >
        {renderElements(spec.content || [], dispatch, passDown)}
    </Descriptions>
);
elementComponentRegistry['DetailGroup'] = DetailGroupPart
elementComponentRegistry['DetailItem'] = ({spec, dispatch, passDown}) => <Descriptions.Item key={spec.uuid} label={spec.title}>{spec.value}</Descriptions.Item>


export const DividerPart = () => (
    <Divider
        style={{
            marginBottom: 32,
        }}
        />
);
elementComponentRegistry['Divider'] = DividerPart

export const HeaderPart = ({ spec }:ElementProps) => {
    switch(spec.level){
        case 1:
            return <h1 style={{ marginBottom: 16, fontSize: '1.7em' }} key={spec.uuid}>{spec.text}</h1>;
            break;
        case 2:
            return <h2 style={{ marginBottom: 16 }} key={spec.uuid}>{spec.text}</h2>;
            break;
        case 3:
            return <h3 style={{ marginBottom: 16 }} key={spec.uuid}>{spec.text}</h3>;
            break;
        default:
            return <h4 style={{ marginBottom: 16 }} key={spec.uuid}>{spec.text}</h4>;
    }
};
elementComponentRegistry['Header'] = HeaderPart

export const ParagraphPart = ({ spec }:ElementProps) => {
    const style = spec.color ? { color: spec.color } : undefined;
    return <p style={style} key={spec.uuid}>{nl2br(spec.text || '')}</p>
}
elementComponentRegistry['Paragraph'] = ParagraphPart


elementComponentRegistry['Span'] = ({ spec }:ElementProps) => {
    const style = spec.color ? { color: spec.color } : undefined;
    return <span style={style} key={spec.uuid}>{nl2br(spec.text || '')}</span>
}

export const RawHTMLPart = ({ spec }:ElementProps) => {
    return <div dangerouslySetInnerHTML={{__html:spec.text || ''}} key={spec.uuid}></div>
}
elementComponentRegistry['RawHTML'] = RawHTMLPart