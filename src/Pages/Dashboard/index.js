import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
/*import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Owners from '../../Containers/Owners';
import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';*/

import { GetVeterinary } from "../../Services/Veterinary";

import "./styles.scss";
import SubMenu from "../../Components/Menu/SubMenu";

const Dahsboard = (props) => {
  const history = useHistory();

  const [sesion, setSesion] = useState(null);

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
    if (localSesion.x_usuarios_veterinarias === undefined) {
      history.push("/set-veterinary");
      return;
    }
    if (localSesion.id_x_usuarios_veterinarias_en_uso === null) {
      history.push("/set-veterinary");
      return;
    }
    if (localSesion.access_token !== undefined) {
      //debugger;
      GetVeterinary(
        localSesion.x_usuarios_veterinarias.id_veterinaria,
        localSesion.access_token,
        (data) => {
          //console.log(data);
          setSesion({ ...localSesion, veterinary: data });
          //console.log({...localSesion, veterinary:data})
          props.onChangeSesion({ ...localSesion, veterinary: data });
          localStorage.setItem(
            "sesion",
            JSON.stringify({ ...localSesion, veterinary: data })
          );
        }
      );
    }
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content">{/*<Owners/>*/}</div>

      <SubMenu />
    </div>
  );
};
export default Dahsboard;
