import {
    Button,
    Card,
    DatePicker,
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

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};

const submitFormLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
    },
};

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
                { renderElements(spec.content || [], dispatch, {...passDown, wrapInput}) }
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

export const FormActionsPart = ({ spec, dispatch, passDown }:ElementProps) => 
(
    <FormItem key={spec.uuid} {...submitFormLayout} style={{ marginTop: 32 }}>
        { renderElements(spec.content || [], dispatch, passDown) }
    </FormItem>
)

export const SubmitButtonPart = ({ spec }:ElementProps) => (
    <Button key={spec.uuid} type="primary" htmlType="submit">
        {spec.title}
    </Button>
)