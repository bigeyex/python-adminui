import {
    Icon,
    Button,
    Card,
    DatePicker,
    Checkbox,
    Form,
    Input,
    Select,
    Upload,
    notification,
  } from 'antd';

import React, { Component, SyntheticEvent, useState } from 'react';

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
            form,
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

        const getFieldValues = () => {
            return form.getFieldsValue();
        }

        return (
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                <Card bordered={false}>
                { renderElements(spec.content || [], dispatch, {...passDown, wrapInput, getFieldValues, titleInline:spec.style.titleInline}) }
                </Card>
            </Form>
        )
    }
}

export default Form.create<FormPartProps>()(FormPart);

const handleFormItemChange = (spec:PageElement, dispatch:Dispatch<any>, passDown:any) => {
    return (value:any) => {
        let values = null;
        if ('getFieldValues' in passDown) {
            values = passDown.getFieldValues();
            if(spec.name) {
                values[spec.name] = value;
            }
        }
        
        dispatch({
            type: 'page/submitAction',
            payload: {
                cb_uuid: spec.on_change,
                args: [ value, values ]
            }
        });
    }
}

const inputChangeTimers = {};
const handleFormInputChange = (spec:PageElement, dispatch:Dispatch<any>, passDown:any) => {
    return (event:SyntheticEvent) => {
        if(inputChangeTimers[spec.uuid]) {
            clearTimeout(inputChangeTimers[spec.uuid]);
        }
        let targetValue:any = (event.currentTarget as any).value;
        inputChangeTimers[spec.uuid] = setTimeout(() => handleFormItemChange(spec, dispatch, passDown)(targetValue), 1000);
    }
}


export const TextFieldPart = ({ spec, dispatch, passDown }:ElementProps) => {
    const el = <Input placeholder={spec.placeholder || ''} onChange={spec.on_change ? handleFormInputChange(spec, dispatch, passDown) : undefined}/>;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const TextAreaPart = ({ spec, dispatch, passDown }:ElementProps) => {
    const el = <TextArea
        style={{ minHeight: 32 }}
        placeholder={spec.placeholder || ''}
        rows={4}
        onChange={spec.on_change ? handleFormInputChange(spec, dispatch, passDown) : undefined}
    />;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const SelectBoxPart = ({ spec, passDown, dispatch }:ElementProps) => {
    const el = <Select placeholder={spec.placeholder || ''} onChange={spec.on_change ? handleFormItemChange(spec, dispatch, passDown) : undefined}
                    mode={spec.tags ? "tags" : spec.multiple ? "multiple" : undefined}>
        { spec.data.map((o:[string, string]) => <Select.Option key={o[1]} value={o[1]}>{o[0]}</Select.Option>) }
    </Select>;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const CheckboxGroupPart = ({ spec, passDown, dispatch }:ElementProps) => {
    const el = <Checkbox.Group  onChange={spec.on_change ? handleFormItemChange(spec, dispatch, passDown) : undefined}
        options={spec.data.map((d:[string, string]) => ({'label': d[0], 'value': d[1]}))} />;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}

export const DatePickerPart = ({ spec, passDown, dispatch }:ElementProps) => {
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    let el:JSX.Element;
    const onChange = spec.on_change ? handleFormItemChange(spec, dispatch, passDown) : undefined
    if( spec.subtype == 'month' ) {
        el = <MonthPicker placeholder={spec.placeholder} onChange={onChange}/>
    }
    else if(spec.subtype == 'range') {
        el = <RangePicker onChange={onChange}/>
    }
    else if(spec.subtype == 'week') {
        el = <WeekPicker placeholder={spec.placeholder} onChange={onChange} />
    }
    else {
        el = <DatePicker placeholder={spec.placeholder} onChange={onChange} />
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

export const UploadPart = ({ spec, dispatch, passDown }:ElementProps) => 
{
    const [fileList, setFileList] = useState([]);
    const props = {
        name: spec.name,
        action: '/api/upload',
        onChange(info:any) {
          if (info.file.status === 'done') {
            notification.success({
                message: 'Uploaded successfully',
                description: `Uploaded ${info.file.name} successfully.`
            })
            const responseFile = { 
                display_name: info.file.name, 
                file_name: info.file.response, 
                size: info.file.size,
                type: info.file.type
            };
            const responseFileList = info.fileList.map((file:any) => ({
                display_name: file.name, 
                file_name: file.response, 
                size: file.size,
                type: file.type
            }));
            dispatch({
                type: 'page/submitAction',
                payload: {
                    cb_uuid: spec.on_data,
                    args: [ responseFile, responseFileList ]
                }
            })
          } else if (info.file.status === 'error') {
            notification.error({
                message: 'Upload failed',
                description: `Failed to upload ${info.file.name}`
            })
          }
          const fileList = info.fileList.map((file:any) => {
            if(file.response) {
                file.file_name = file.response;
            }
            return file;
          });
          setFileList(fileList);
        },
      };
    const el = <Upload key={spec.uuid} {...props} fileList={fileList}>
        <Button>
            <Icon type="upload"/> Click to Upload
        </Button>
    </Upload>
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}