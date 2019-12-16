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

import { Element } from '@/models/page';

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
    spec: Element;
    dispatch: Dispatch<any>;
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
                    action: 'form_submit',
                    values: values,
                    uuid: spec.uuid
                }
            });
            }
        });
    };

    render() {
        const {
            spec,
            form: { getFieldDecorator },
        } = this.props;

        const wrapInput = (spec:Element, input:JSX.Element) => {
            return (
                <FormItem key={spec.uuid} {...formItemLayout} label={spec.title}>
                    {getFieldDecorator(spec.name || "", {
                        rules: [
                          {
                            required: spec.requiredMessage ? true:false,
                            message: spec.requiredMessage || '',
                          },
                        ],
                      })(input)}
                </FormItem>
            )
        }

        const TextFieldPart = (spec:Element) => 
            wrapInput(spec, (<Input placeholder={spec.placeholder || ''} />));

        const TextAreaPart = (spec:Element) => 
            wrapInput(spec, (
                <TextArea
                    style={{ minHeight: 32 }}
                    placeholder={spec.placeholder || ''}
                    rows={4}
                />
              ));
        
        const FormActionsPart = (spec:Element) => (
            <FormItem key={spec.uuid} {...submitFormLayout} style={{ marginTop: 32 }}>
                {renderFormItems(spec)}
            </FormItem>
        )

        const SubmitButtonPart = (spec:Element) => (
            <Button key={spec.uuid} type="primary" htmlType="submit">
                {spec.title}
            </Button>
        )
        
        const renderFormItems = (spec:Element) => {
            let formItems:[JSX.Element?] = [];
            if(spec.content) {
                spec.content.forEach(element => {
                    switch(element.type) {
                        case 'TextField':
                            formItems.push(TextFieldPart(element));
                            break;
                        case 'TextArea':
                            formItems.push(TextAreaPart(element));
                            break;
                        case 'FormActions':
                            formItems.push(FormActionsPart(element));
                            break;
                        case 'SubmitButton':
                            formItems.push(SubmitButtonPart(element));
                            break;
                    }
                });
            }
            return formItems;
        }
        

        return (
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <Card bordered={false}>
                {renderFormItems(spec)}
                </Card>
            </Form>
        )
    }
}

export default Form.create<FormPartProps>()(FormPart);

