
import React, { Component } from 'react';
import styles from './table.less';
import StandardTable from '@/components/StandardTable';
import renderElements, { ElementProps } from './element';


class TableListPart extends Component<ElementProps> {
    render() {
        const {
            spec, dispatch
        } = this.props;

        const renderTableActions = () => {
            if(spec.table_actions) {
                return (
                    <div className={styles.tableListOperator}>
                        { renderElements(spec.table_actions, dispatch) }
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
                    data={spec.data}
                    columns={spec.columns || []}
                    selectedRows={[]}
                    onSelectRow={()=>{}}
                />
          </div>
        )
    }
}

export default TableListPart;