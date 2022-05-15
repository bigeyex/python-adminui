import { PageElement, elementComponentRegistry } from '@/models/page';
import { Dispatch, AnyAction } from 'redux';

import './form'
import './controls'
import './layout'
import './table'
import './detail'
import './chart'
import './feedback'



const renderElements = (elements:PageElement[], dispatch:Dispatch<AnyAction>, passDown:any) => {
    passDown = passDown ? passDown : {};
    let pageElements:[JSX.Element?] = [];
    elements.forEach(spec => {
      pageElements.push(elementComponentRegistry[spec?.type]({spec, dispatch, passDown}))
    });
    return pageElements;
}

export default renderElements;