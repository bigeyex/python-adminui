import { PageElement } from '@/models/page';
import { Dispatch, AnyAction } from 'redux';
import FormPart from './form';
import { ButtonPart, LinkPart } from './controls'
import React from 'react';
import DataTablePart from './table';
import { CardPart } from './layout';

export interface ElementProps {
    spec: PageElement;
    dispatch: Dispatch<any>;
}

const renderElements = (elements:PageElement[], dispatch:Dispatch<AnyAction>) => {
    let pageElements:[JSX.Element?] = [];
    elements.forEach(element => {
        switch(element?.type) {
            case 'Form':
              pageElements.push(<FormPart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
            case 'DataTable':
              pageElements.push(<DataTablePart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
            case 'Button':
              pageElements.push(<ButtonPart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
            case 'Link':
              pageElements.push(<LinkPart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
            case 'Card':
              pageElements.push(<CardPart key={element.uuid} spec={element} dispatch={dispatch}/>);
              break;
        }
    });
    return pageElements;
}

export default renderElements;