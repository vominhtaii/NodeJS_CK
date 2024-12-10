import React from 'react'
import HeaderCommponent from '../HeaderCommponent/HeaderCommponent';
import ChangeHeader from '../../pages/ChangeHeader/ChangeHeader';

const DefaultCommponent = ({children , isShowHeader}) => {
    return (
        <div>
              {isShowHeader && <ChangeHeader/>}
              {children}
        </div>
      );
    };


export default DefaultCommponent
