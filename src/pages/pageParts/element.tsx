import { PageElement } from '@/models/page';
import { Descriptions } from "antd";
import { Dispatch, AnyAction } from 'redux';
import FormPart, { TextFieldPart, TextAreaPart, SelectBoxPart, CheckboxGroupPart, 
  DatePickerPart ,FormActionsPart, SubmitButtonPart } from './form';
import { ButtonPart, LinkPart } from './controls'
import React from 'react';
import DataTablePart from './table';
import { CardPart, RowPart, ChartCardPart, StatisticPart } from './layout';
import { DetailGroupPart, DividerPart, ParagraphPart, HeaderPart } from './detail';
import { BarChartPart, LineChartPart } from './chart';

export interface ElementProps {
    spec: PageElement;
    dispatch: Dispatch<any>;
    passDown: any;         // pass down attributes down the tree. e.g. getFieldDecorator function of the form 
                              // if the form controls are nested in containers
}

const renderElements = (elements:PageElement[], dispatch:Dispatch<AnyAction>, passDown:any) => {
    passDown = passDown ? passDown : {};
    let pageElements:[JSX.Element?] = [];
    elements.forEach(element => {
        switch(element?.type) {
            case 'Form':
              pageElements.push(<FormPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown}/>);
              break;
            case 'TextField':
              pageElements.push(<TextFieldPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'TextArea':
              pageElements.push(<TextAreaPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'SelectBox':
              pageElements.push(<SelectBoxPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'DatePicker':
              pageElements.push(<DatePickerPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'CheckboxGroup':
              pageElements.push(<CheckboxGroupPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'FormActions':
              pageElements.push(<FormActionsPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'SubmitButton':
              pageElements.push(<SubmitButtonPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'DataTable':
              pageElements.push(<DataTablePart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown}/>);
              break;
            case 'Button':
              pageElements.push(<ButtonPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'Link':
              pageElements.push(<LinkPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'Card':
              pageElements.push(<CardPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown}/>);
              break;
            case 'DetailGroup':
              pageElements.push(<DetailGroupPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown}/>);
              break;
            case 'DetailItem':
              pageElements.push(<Descriptions.Item key={element.uuid} label={element.title}>{element.value}</Descriptions.Item>);
              break;
            case 'Divider':
              pageElements.push(<DividerPart key={element.uuid}/>);
              break;
            case 'Paragraph':
              pageElements.push(<ParagraphPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'Header':
              pageElements.push(<HeaderPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'Row':
              pageElements.push(<RowPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'ChartCard':
              pageElements.push(<ChartCardPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'Statistic':
              pageElements.push(<StatisticPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'BarChart':
              pageElements.push(<BarChartPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;
            case 'LineChart':
              pageElements.push(<LineChartPart key={element.uuid} spec={element} dispatch={dispatch} passDown={passDown} />);
              break;

        }
    });
    return pageElements;
}

export default renderElements;