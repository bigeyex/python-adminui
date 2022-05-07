import React, { Component } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { PageModelState } from '@/models/page';
import renderElements from './pageParts/element';
import FormPart from './pageParts/form';
import {RouteComponentProps, withRouter} from "react-router";

type PageProps = RouteComponentProps & {
  dispatch: Dispatch<AnyAction>,
  spec: PageModelState
}



class AdminPage extends Component<PageProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'page/fetch',
      payload: location.pathname
    });
  }

  componentDidUpdate(prevProps:any) {
    if(this.props.location != prevProps.location) {
      this.props.dispatch({
        type: 'page/fetch',
        payload: location.pathname
      });
    }
  }

  render() {
    const { spec, dispatch } = this.props;

    let pageElements:[JSX.Element?] = [];
    if(spec.pageLayout?.content) {
      pageElements = renderElements(spec.pageLayout.content, dispatch, {});
    }
    let modalFormElements = null
    if(spec.modalForm?.form !== null) {
      modalFormElements = (<FormPart dispatch={dispatch} spec={{...spec.modalForm!.form, visible:spec.modalForm?.modalVisible}} passDown={null}/>)
    }

    return (
      <PageHeaderWrapper>
        {pageElements}
        {modalFormElements}
      </PageHeaderWrapper>
    )
  }
}

export default connect(({ page }:{ page: PageModelState }) =>
      ({ spec:page }))(withRouter(AdminPage));
