
import React, { Component, Fragment } from 'react';
import styles from './table.less';
import StandardTable from '@/components/StandardTable';
import renderElements from './element';
import { ElementProps, elementComponentRegistry } from '@/models/page';
import { Divider } from 'antd';
import { PageElement } from '@/models/page';
import { TableListPagination, TableListItem, TableListParams } from '@/components/StandardTable/data';
import { SorterResult, PaginationConfig } from 'antd/lib/table';

interface TableListState {
    expandForm: boolean;
    selectedRows: TableListItem[];
    formValues: { [key: string]: string };
    stepFormValues: Partial<TableListItem>;
}

interface TableDataType {
    list: TableListItem[];
    pagination: false | PaginationConfig | undefined;
    
}

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');


class DataTablePart extends Component<ElementProps> {
    state: TableListState = {
        expandForm: false,
        selectedRows: [],
        formValues: {},
        stepFormValues: {},
    };

    constructor(props:ElementProps) {
        super(props);
        const {
            spec, dispatch
        } = this.props;
        
        const handleRowAction = (record:any, action:PageElement) => {
            dispatch({
                type: 'page/submitAction',
                payload: {
                    cb_uuid: action.on_click,
                    args: [ record ]
                }
            });
        }

        if(spec.columns) {
            if(spec.row_actions && spec.row_actions.length > 0) {
                let row_actions = {}
                spec.row_actions.forEach(action => {
                    row_actions[action.id as string] = action;
                });
                spec.columns.push({
                    title: '', 
                    render: (_:string, record:any) => {
                        let available_actions = record._actions ? 
                            record._actions.map((item:string) => row_actions[item]) : spec.row_actions;
                        let action_el = [];
                        for(let i=0; i<available_actions.length; i++) {
                            let action = available_actions[i];
                            if(!action) {   // if a certain row has a row action, and its id is not defined, fail gracefully
                                continue;
                            }
                            if(i != 0) {
                                action_el.push(<Divider key={'divider'+i} type="vertical"/>);
                            }
                            action_el.push(<a key={i} onClick={() => handleRowAction(record, action)}>{action.title}</a>);
                        }
                        return (
                            <Fragment>
                                {action_el}
                            </Fragment>
                        );
                    }
                })
            }  
        }
    }

    handleStandardTableChange = (
        pagination: Partial<TableListPagination>,
        filtersArg: Record<keyof TableListItem, string[]>,
        sorter: SorterResult<TableListItem>,
    ) => {
        const { dispatch, spec } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params: Partial<TableListParams> = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'page/requestDataUpdate',
            payload: {
                cb_uuid: spec.on_data,
                uuid: spec.uuid,
                args: [ {
                    current_page: params.currentPage,
                    page_size: params.pageSize
                } ]
            }
        });
    };

    render() {
        const {
            spec, dispatch, passDown
        } = this.props;

        const renderTableActions = () => {
            if(spec.table_actions) {
                return (
                    <div className={styles.tableListOperator}>
                        { renderElements(spec.table_actions, dispatch, passDown) }
                    </div>
                )
            }
            else{
                return null;
            }
        }

        
        return (
            <div className={styles.tableList}>
                <div className={styles.tableListForm}></div>
                <div className={styles.tableListOperator}>
                    { renderTableActions() }
                </div>
                <StandardTable
                    data={spec.data as TableDataType}
                    selectable={false}
                    columns={spec.columns || []}
                    selectedRows={[]}
                    onSelectRow={()=>{}}
                    onChange={this.handleStandardTableChange}
                />
          </div>
        )
    }
}

elementComponentRegistry['DataTable'] = ({spec, dispatch, passDown}) => <DataTablePart key={spec.uuid} spec={spec} dispatch={dispatch} passDown={passDown}/>
export default DataTablePart;