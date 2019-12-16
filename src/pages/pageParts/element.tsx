import { Element } from '@/models/page';
import { Dispatch, AnyAction } from 'redux';
import FormPart from './form';
import { ButtonPart, LinkPart } from './controls'
import React from 'react';
import TableListPart from './table';

export interface ElementProps {
    spec: Element;
    dispatch: Dispatch<any>;
}

const renderElements = (elements:Element[], dispatch:Dispatch<AnyAction>) => {
    let pageElements:[JSX.Element?] = [];
    elements.forEach(element => {
        switch(element?.type) {
            case 'Form':
              pageElements.push(<FormPart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
            case 'TableList':
              pageElements.push(<TableListPart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
            case 'Button':
              pageElements.push(<ButtonPart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
            case 'Link':
              pageElements.push(<LinkPart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
        }
    });
    return pageElements;
}

export default renderElements;