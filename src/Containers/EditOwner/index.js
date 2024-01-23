import React, { useState, useEffect } from "react";
import Drawer from "../../Components/Drawer";
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

import { EditOwner as EditOwnerService } from "../../Services/Owner";
import { validateEmail } from "../../Validator";

import "./styles.scss";

const TextFieldStyles = {
  marginBottom: "1em",
  width: "100%",
};

const EditOwner = (props) => {
  const [fetching, setFetching] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    //console.log(props.data)
    setData({
      ...props.data,
      id_veterinaria: props.id_vet,
      token: props.token,
    });
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

  const handleUpdate = () => {
    console.log(data);
    if (!emailError && !fetching) {
      setFetching(true);
      EditOwnerService(
        data,
        (resp) => {
          console.log(resp);
          props.onUpdate(resp);
          props.onClose();
          setFetching(false);
        },
        (error) => {
          console.error(error);
          setFetching(false);
        }
      );
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
    <Drawer open={props.open} anchor="bottom" className="edit-owner-wrapper">
      {data !== null && (
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
              <span className="owner-header-title">{data.nombre}</span>
              <span className="owner-header-subtitle">
                Editando propietario
              </span>
            </span>
          </div>
          <span className="btn-add-owner" onClick={handleUpdate}>
            <BackupIcon />
          </span>
        </div>
      )}
      {data !== null && (
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
                    name: "id_region",
                    id: "id_region",
                  }}
                  style={TextFieldStyles}
                  value={data.id_region}
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
                label="Identificación regional"
                name="identificacion_regional"
                style={TextFieldStyles}
                onChange={handleData}
                value={data.identificacion_regional}
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
      )}
    </Drawer>
  );
};

EditOwner.defaultProps = {
  regions: null,
};

export default EditOwner;
