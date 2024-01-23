import React, { useEffect, useState } from 'react';
import Drawer from '../Drawer';
import {
    CircularProgress
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StoreIcon from '@material-ui/icons/Store';
import {GetVeterinary} from '../../Services/Veterinary';

import './styles.scss';

const Vet = (props) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        GetVeterinary(props.id, props.token, (resp)=>{
            //console.log(resp);
            setData(resp);
        });
    },[])
    return (
        <div>
            <Drawer
              open={props.open}
              className='vet-detail-wrapper'
            >
                <div className='vet-header'>
                    <span onClick={props.onClose} className='pointer'>
                        <ArrowBackIcon/>
                    </span>
                    <span className='store-icon'>
                        <StoreIcon/>
                    </span>
                    <span>
                        {props.name}
                    </span>
                </div>
                {
                    data!==null?
                    <div className='vet-content'>
                        <span>Nombre</span>
                        <h4>{data.nombre}</h4>
                        <span>Dirección</span>
                        <h4>{data.direccion}</h4>
                        <span>Region</span>
                        <h4>{data.nombre_region}</h4>
                        <span>Pagina web</span>
                        <h4>{data.pagina_web}</h4>
                        <span>Propietario</span>
                        <h4>{data.propietario}</h4>
                        <span>Telefono</span>
                        <h4>{data.telefono}</h4>
                        <span>Email</span>
                        <h4>{data.email}</h4>
                        <span>Notas</span>
                        <h4>{data.notas}</h4>
                        
                    </div>
                    :
                    <span className='circular-progress'>
                        <CircularProgress/>
                    </span>
                }
            </Drawer>
        </div>
    )
}
export default Vet;