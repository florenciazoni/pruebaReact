import React from 'react';
import Drawer from '../Drawer';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './styles.scss';

const User = (props) => {
    return (
        <Drawer
            open={props.open}
            className='user-wrapper'
        >
            <React.Fragment>
                <div className='user-header'>
                    <span onClick={props.onClose} className='pointer'>
                        <ArrowBackIcon/>
                    </span>
                    <span className='user-icon'>
                        <AccountCircleIcon/>
                    </span>
                    <span className='user-name'>
                        {props.data.nombre}
                    </span>
                </div>
                <div className='user-content'>
                    <span>Nombre</span>
                    <h4>{props.data.nombre}</h4>
                    <span>Dirección</span>
                    <h4>{props.data.direccion}</h4>
                    <span>Region</span>
                    <h4>{props.data.nombre_region}</h4>
                    <span>Teléfono</span>
                    <h4>{props.data.telefono}</h4>
                    <span>Email</span>
                    <h4>{props.data.email}</h4>
                    <span>Identificación regional</span>
                    <h4>{props.data.identificacion_regional}</h4>
                    <span>notas</span>
                    <h4>{props.data.notas}</h4>
                </div>
            </React.Fragment>
        </Drawer>
    )
}
export default User;