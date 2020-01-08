import {
    Button,
    Card,
    DatePicker,
    Checkbox,
    Form,
    Input,
    Select,
  } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';

import { PageElement } from '@/models/page';
import renderElements, { ElementProps } from './element';

const FormItem = Form.Item;
const { TextArea } = Input;

interface FormPartProps extends FormComponentProps {
    spec: PageElement;
    dispatch: Dispatch<any>;
    passDown: any;
}

class FormPart extends Component<FormPartProps> {
    handleSubmit = (e: React.FormEvent) => {
        const { dispatch, form, spec } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
            dispatch({
                type: 'page/submitAction',
                payload: {
                    cb_uuid: spec.on_submit,
                    args: [ values ]
                }
            });
            }
        });
    };

    render() {
        const {
            spec,
            dispatch,
            passDown,
            form: { getFieldDecorator },
        } = this.props;

        const formItemLayout = spec.style.titleInline ? {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        } : {};

        const wrapInput = (spec:PageElement, input:JSX.Element) => {
            return (
                <FormItem key={spec.uuid} {...formItemLayout} label={spec.title}>
                    {getFieldDecorator(spec.name || "", {
                        rules: [
                          {
                            required: spec.required_message ? true:false,
                            message: spec.required_message || '',
                          },
                        ],
                      })(input)}
                </FormItem>
            )
        }


        return (
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <Card bordered={false}>
                { renderElements(spec.content || [], dispatch, {...passDown, wrapInput, titleInline:spec.style.titleInline}) }
                </Card>
            </Form>
        )
    }
}

export default Form.create<FormPartProps>()(FormPart);

export const TextFieldPart = ({ spec, passDown }:ElementProps) => {
    const el = <Input placeholder={spec.placeholder || ''} />;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const TextAreaPart = ({ spec, passDown }:ElementProps) => {
    const el = <TextArea
        style={{ minHeight: 32 }}
        placeholder={spec.placeholder || ''}
        rows={4}
    />;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const SelectBoxPart = ({ spec, passDown }:ElementProps) => {
    const el = <Select placeholder={spec.placeholder || ''}>
        { spec.data.map((o:[string, string]) => <Select.Option key={o[1]} value={o[1]}>{o[0]}</Select.Option>) }
    </Select>;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const CheckboxPart = ({ spec, passDown }:ElementProps) => {
    return <Checkbox name={spec.name}>{spec.title}</Checkbox>
}

export const CheckboxGroupPart = ({ spec, passDown }:ElementProps) => {
    const el = <Checkbox.Group 
        options={spec.data.map((d:[string, string]) => ({'label': d[0], 'value': d[1]}))} />;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const DatePickerPart = ({ spec, passDown }:ElementProps) => {
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    let el:JSX.Element;
    console.log(spec);
    if( spec.subtype == 'month' ) {
        el = <MonthPicker placeholder={spec.placeholder} />
    }
    else if(spec.subtype == 'range') {
        el = <RangePicker />
    }
    else if(spec.subtype == 'week') {
        el = <WeekPicker placeholder={spec.placeholder} />
    }
    else {
        el = <DatePicker placeholder={spec.placeholder} />
    }
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const FormActionsPart = ({ spec, dispatch, passDown }:ElementProps) => 
{
    const submitFormLayout = passDown.titleInline ? {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 10, offset: 7 },
        },
    } : {};
    return <FormItem key={spec.uuid} {...submitFormLayout} style={{ marginTop: 32 }}>
        { renderElements(spec.content || [], dispatch, passDown) }
    </FormItem>
}

export const SubmitButtonPart = ({ spec }:ElementProps) => (
    <Button key={spec.uuid} type="primary" htmlType="submit">
        {spec.title}
    </Button>
)