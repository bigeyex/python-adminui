import {
    Icon,
    Button,
    Card,
    DatePicker,
    Checkbox,
    Radio,
    Form,
    Input,
    Select,
    Upload,
    Modal,
    notification,
    Row, Col
  } from 'antd';

import React, { Component, SyntheticEvent, useState } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';

import { PageElement } from '@/models/page';
import renderElements from './element';
import { ElementProps, elementComponentRegistry } from '@/models/page';
import tableStyles from './table.less';

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
                // preprocessing submited data
                for (let k of Object.keys(values)) {
                    // if non of the files in a Upload component has done uploading, pass 'undefined' to the Uplaod Field
                    if (values[k] && values[k].file && (!values[k].fileList.some((file:any) => file.status=='done'))) {
                        delete values[k];
                    }
                }
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

    handleModalCancel = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'page/closeModalForm',
        });
    };

    handleFilterFormReset = () => {
        const { form, passDown } = this.props;
        form.resetFields();
        passDown.onFilterFormValueChange(form.getFieldsValue());
    }

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
                        initialValue: spec.value?spec.value:undefined, 
                      })(input)}
                </FormItem>
            )
        }

        const wrapModalInput = (spec:PageElement, input:JSX.Element) => {
            return (
                <FormItem key={spec.uuid} label={spec.title}>
                    {getFieldDecorator(spec.name || "", {
                        rules: [
                          {
                            required: spec.required_message ? true:false,
                            message: spec.required_message || '',
                          },
                        ],
                        initialValue: spec.value?spec.value:undefined, 
                      })(input)}
                </FormItem>
            )
        }

        const wrapFilterFormInput = (spec:PageElement, input:JSX.Element) => {
            return (
                <Col md={8} sm={24}>
                    <FormItem key={spec.uuid} label={spec.title}>
                        {getFieldDecorator(spec.name || "", {
                            initialValue: spec.value?spec.value:undefined, 
                        })(input)}
                    </FormItem>
                </Col>
            )
        }

        const getFieldValues = () => {
            return form.getFieldsValue();
        }

        if (spec.type == 'ShowModalForm') { 
            return (
                <Modal
                    key={spec.uuid}
                    destroyOnClose
                    title={spec.title}
                    visible={spec.visible}
                    onOk={this.handleSubmit}
                    onCancel={() => this.handleModalCancel()}
                >
                    <Form layout='vertical'>
                    { renderElements(spec.content || [], dispatch, {...passDown, wrapInput:wrapModalInput, getFieldValues}) }
                    </Form>
                </Modal>
            );
        }
        else if (spec.type == 'FilterForm') {  
            // filter form used in DataTables. Needs onFilterFormSubmit and onFilterFormValueChange in passDown
            let rows = [];
            const finalCol = (
                <Col md={8} sm={24}>
                    <span className={tableStyles.submitButtons}>
                        <Button type="primary" htmlType="submit">
                            {spec.style.submitText}
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFilterFormReset}>
                            {spec.style.resetText}
                        </Button>
                    </span>
                </Col>
            )
            for(let i=0; i<spec.content!.length; i+=3) {
                rows.push( 
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        {renderElements(spec.content?.slice(i, i+3) || [], dispatch, {...passDown, wrapInput:wrapFilterFormInput, getFieldValues})}
                        {i+3>spec.content!.length ? finalCol : undefined}
                    </Row> );
            }
            if (spec.content!.length % 3 == 0) {
                rows.push(<Row gutter={{ md: 8, lg: 24, xl: 48 }}>{finalCol}</Row>);
            }
            return ( <Form onSubmit={passDown.onFilterFormSubmit} layout="inline">{rows}</Form> )
        }
        else {
            return (
                <Form onSubmit={this.handleSubmit} key={spec.uuid} hideRequiredMark style={{ marginTop: 8 }}>
                    <Card bordered={false}>
                    { renderElements(spec.content || [], dispatch, {...passDown, wrapInput, getFieldValues, titleInline:spec.style.titleInline}) }
                    </Card>
                </Form>
            )
        }
    }
}

const FormPartWrapper = Form.create<FormPartProps>()(FormPart);
export default FormPartWrapper
elementComponentRegistry['Form'] = ({spec, dispatch, passDown}) => <FormPartWrapper key={spec.uuid} spec={spec} dispatch={dispatch} passDown={passDown}/>

export const DataTableFilterForm = Form.create<FormPartProps>({
    onValuesChange: (props, changedValues, allValues) => {
        props.passDown.onFilterFormValueChange(allValues);
    }
})(FormPart);

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
    const el = spec.style.password ?
        <Input.Password key={spec.uuid} placeholder={spec.placeholder || ''} disabled={spec.disabled} onChange={spec.on_change ? handleFormInputChange(spec, dispatch, passDown) : undefined}/> :
        <Input key={spec.uuid} placeholder={spec.placeholder || ''} disabled={spec.disabled} onChange={spec.on_change ? handleFormInputChange(spec, dispatch, passDown) : undefined}/>;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}
elementComponentRegistry['TextField'] = TextFieldPart

export const TextAreaPart = ({ spec, dispatch, passDown }:ElementProps) => {
    const el = <TextArea key={spec.uuid}
        style={{ minHeight: 32 }}
        placeholder={spec.placeholder || ''}
        rows={4} disabled={spec.disabled}
        onChange={spec.on_change ? handleFormInputChange(spec, dispatch, passDown) : undefined}
    />;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}
elementComponentRegistry['TextArea'] = TextAreaPart

export const SelectBoxPart = ({ spec, passDown, dispatch }:ElementProps) => {
    const el = <Select key={spec.uuid} placeholder={spec.placeholder || ''} onChange={spec.on_change ? handleFormItemChange(spec, dispatch, passDown) : undefined}
                    mode={spec.tags ? "tags" : spec.multiple ? "multiple" : undefined} disabled={spec.disabled}>
        { spec.data.map((o:[string, string]) => <Select.Option key={o[1]} value={o[1]}>{o[0]}</Select.Option>) }
    </Select>;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}
elementComponentRegistry['SelectBox'] = SelectBoxPart

export const CheckboxGroupPart = ({ spec, passDown, dispatch }:ElementProps) => {
    const el = <Checkbox.Group key={spec.uuid} onChange={spec.on_change ? handleFormItemChange(spec, dispatch, passDown) : undefined}
        options={spec.data.map((d:[string, string]) => ({'label': d[0], 'value': d[1]}))} disabled={spec.disabled} />;
    return passDown.wrapInput ? passDown.wrapInput(spec, el) : el;
}
elementComponentRegistry['CheckboxGroup'] = CheckboxGroupPart

elementComponentRegistry['RadioGroup'] = ({ spec, passDown, dispatch }:ElementProps) => {
    let options;
    if (spec.format == 'vertical') {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        options = spec.data.map((option:[any, any]) => <Radio style={radioStyle} value={option[1]} defaultChecked={spec.value==option[1]}>{option[0]}</Radio>);
    }
    else if (spec.format == 'button') {
        options = spec.data.map((option:[any, any]) => <Radio.Button value={option[1]} defaultChecked={spec.value==option[1]}>{option[0]}</Radio.Button>);
    }
    else {
        options = spec.data.map((option:[any, any]) => <Radio value={option[1]} defaultChecked={spec.value==option[1]}>{option[0]}</Radio>);
    }
    const el = <Radio.Group key={spec.uuid} onChange={spec.on_change ? handleFormItemChange(spec, dispatch, passDown) : undefined}  disabled={spec.disabled} >{options}</Radio.Group>;
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
elementComponentRegistry['DatePicker'] = DatePickerPart

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
elementComponentRegistry['FormActions'] = FormActionsPart

export const SubmitButtonPart = ({ spec }:ElementProps) => (
    <Button key={spec.uuid} type="primary" htmlType="submit">
        {spec.title}
    </Button>
)
elementComponentRegistry['SubmitButton'] = SubmitButtonPart

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

elementComponentRegistry['Upload'] = ({spec, dispatch, passDown}) => <UploadPart key={spec.uuid} spec={spec} dispatch={dispatch} passDown={passDown} />

