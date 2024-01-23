import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import Dialog from "../../Components/Dialog";
import {
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BackupIcon from "@material-ui/icons/Backup";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./styles.scss";

import { AddOwner as AddNewOwner } from "../../Services/Owner";
import { validateEmail } from "../../Validator";

const TextFieldStyles = {
  marginBottom: "1em",
  width: "100%",
};

const AddOwner = (props) => {
  const [data, setData] = useState({
    nombre: null,
    direccion: null,
    region: null,
    telefono: null,
    email: null,
    //id_regional:null,
    notas: null,
    token: null,
    id_veterinaria: null,
    planificadas_tarea: false,
  });

  const [fetching, setFetching] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    setData({ ...data, token: props.token, id_veterinaria: props.idVet });
  }, []);

  const handleData = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (value.length > 200) return;
    if (name === "telefono") {
      if (/^[0-9]*$/.test(value)) setData({ ...data, [name]: value });
      return;
    }
    if (name === "planificadas_tarea") {
      value = event.target.checked;
    }

    setData({ ...data, [name]: value });
  };

  const AddOwner = () => {
    if (!fetching && props.regions !== null) {
      let newData = data;
      if (data.email === "") {
        newData = { ...newData, email: null };
      }
      console.log(newData, "owner data");
      if (
        newData.nombre !==
        "" /*&& data.direccion!=='' && data.region!=='' && data.telefono!=='' && data.email!=='' && data.id_regional!=='' && !emailError*/
      ) {
        setFetching(true);
        AddNewOwner(
          newData,
          (response) => {
            console.log("New owner", response);
            props.onChange(null, response);
            setData({
              ...data,
              nombre: "",
              direccion: null,
              region: null,
              telefono: null,
              email: null,
              // id_regional:null,
              notas: null,
              planificadas_tarea: 0,
            });
            setFetching(false);
          },
          (error) => {
            setFetchingError(true);
            setFetching(false);
          }
        );
      }
    }
  };

  const handleError = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "email") {
      setEmailError(!validateEmail(value));
    }
  };

  return (
    <Drawer open={props.open}>
      <div className="new-owner-wrapper">
        <div className="header-title">
          <div className="controls-new-owner">
            <span
              onClick={props.onClose}
              className="pointer"
              style={{ marginRight: "1em" }}
            >
              <ArrowBackIcon />
            </span>
            <span className="avatar-owner">
              <AccountCircleIcon />
            </span>
            <span style={{ marginLeft: "1em" }}>
              <span className="owner-header-title">Nuevo propietario</span>
              <span className="owner-header-subtitle">
                Ingresando nuevo propietario
              </span>
            </span>
          </div>
          <span className="btn-add-owner" onClick={AddOwner}>
            <BackupIcon />
          </span>
        </div>
        <div className="content">
          {props.regions !== null && !fetching ? (
            <React.Fragment>
              <TextField
                label="Nombre"
                name="nombre"
                style={TextFieldStyles}
                onChange={handleData}
                value={data.nombre}
              />
              <TextField
                label="Dirección"
                name="direccion"
                style={TextFieldStyles}
                onChange={handleData}
                value={data.direccion}
              />
              <FormControl style={{ width: "100%" }}>
                <InputLabel htmlFor="region">Región</InputLabel>
                <Select
                  native
                  //value={state.age}
                  onChange={handleData}
                  inputProps={{
                    name: "region",
                    id: "region",
                  }}
                  style={TextFieldStyles}
                  value={data.region}
                >
                  <option value="" />
                  {props.regions.content.map((data) => {
                    return (
                      <option key={data.id} value={data.id}>
                        {data.nombre_region}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                label="Teléfono"
                name="telefono"
                style={TextFieldStyles}
                onChange={handleData}
                value={data.telefono}
              />
              <span>
                <TextField
                  label="Email"
                  name="email"
                  style={TextFieldStyles}
                  onChange={handleData}
                  value={data.email}
                  onBlur={handleError}
                  error={emailError}
                />
                {emailError && (
                  <span className="fix-here">Por favor corrige aqui</span>
                )}
              </span>
              {/* <TextField 
                            label='Identificación regional'
                            name='id_regional'
                            style={TextFieldStyles}
                            onChange={handleData}
                            value={data.id_regional}
                        /> */}
              <TextField
                label="Notas"
                name="notas"
                style={TextFieldStyles}
                onChange={handleData}
                value={data.notas}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="planificadas_tarea"
                    checked={data.planificadas_tarea}
                    onChange={handleData}
                    style={{
                      color: "#4052b6",
                    }}
                  />
                }
                label="Gestionar suministro planificado como tareas domiciliarias"
              />
            </React.Fragment>
          ) : (
            <div className="spiner">
              <CircularProgress />
            </div>
          )}
        </div>
        <Dialog
          message="Ha ocurrido un error"
          open={fetchingError}
          handleClose={() => {
            setFetchingError(false);
          }}
        />
      </div>
    </Drawer>
  );
};
export default AddOwner;
