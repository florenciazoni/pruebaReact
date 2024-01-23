import { isFriday } from "date-fns";
import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
/*import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';*/
import { default as OwnerComponent } from "../../Containers/Owners";

//import { GetVeterinary } from '../../Services/Veterinary';

import "./styles.scss";

const Owners = (props) => {
  const history = useHistory();

  const [sesion, setSesion] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    let localSesion = null;
    try {
      localSesion = JSON.parse(localStorage.getItem("sesion"));
    } catch (error) {
      localStorage.setItem("sesion", null);
    }
    if (localSesion === null) {
      history.push("/");
      return;
    }
    if (localSesion.access_token !== undefined) {
      /*GetVeterinary( localSesion.x_usuarios_veterinarias.id_veterinaria, localSesion.access_token, (data)=>{
                //console.log(data);
                setSesion({...localSesion, veterinary:data});
                //console.log({...localSesion, veterinary:data})
                props.onChangeSesion({...localSesion, veterinary:data});
                localStorage.setItem('sesion', JSON.stringify({...localSesion, veterinary:data}))
            });*/
    }
    setOptions(props.match.params.option);
  }, []);

  return (
    <div className="owners-wrapper">
      <div className="owners-content">
        <OwnerComponent options={options} />
      </div>
    </div>
  );
};
export default Owners;
