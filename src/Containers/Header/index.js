import React from 'react';

import './styles.scss';
import Menu from '../../Components/Menu';

const Header = (props) => {

    return (
        <div className='header-wrapper'>
            <Menu
                options={props.options}
                //pathname={props.pathname}
                onClick={props.handleOption}
                user={props.user}
                openVetDetail = {props.openVetDetail}
                openOwnerDetail = {props.openOwnerDetail}
            />
            <span>{props.option}</span>
        </div>
    )
}
export default Header;