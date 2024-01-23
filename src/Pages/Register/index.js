import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "../../Components/Dialog";
import { Register as RegisterService } from "../../Services/Register";
import "./styles.scss";
import { validateEmail } from "../../Validator";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { TextField, Button, CircularProgress } from "@material-ui/core";
//import {Link} from 'react-router-dom'

const TextFieldStyles = {
  marginBottom: "1em",
  width: "100%",
};

const Register = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    access_token: null,
    device_name: "web",
    direccion: null,
    email: "",
    id: null,
    id_region: null,
    identificacion_regional: null,
    latlng: null,
    nombre: "",
    nombre_region: null,
    notas: null,
    password: "",
    photo_url: null,
    primera_conexion: null,
    telefono: null,
    tipo_login: "EMAIL",
    ultima_conexion: null,
    unique_id: "",
    valid: false,
    valido_hasta: null,
    x_usuarios_veterinarias: null,
  });

  const [open, setOpen] = useState("");

  const [disabled, setDisabled] = useState(false);

  const [ok, setOk] = useState(false);

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const [passwords, setPasswords] = useState({
    password: "",
    password_c: "",
  });

  const handleData = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    //console.log(name,value)
    if (name === "email") setError({ ...error, email: !validateEmail(value) });
    if (name === "password") {
      handlePasswords(event);
    }
    setData({ ...data, [name]: value });
  };

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleRedirect = () => {
    setOk(false);
    history.push("/");
  };

  const handleRegister = () => {
    setDisabled(true);
    let auxData = { ...data, unique_id: uuidv4() };
    RegisterService(
      auxData,
      (data) => {
        setOk(true);
        setDisabled(false);
        console.log(data);
      },
      (error) => {
        setOpen(true);
        setDisabled(false);
        console.error(error);
      }
    );
  };

  const handlePasswords = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setPasswords({ ...passwords, [name]: value });
  };

  return (
    <div className="register-wrapper">
      <section className="user-data">
        <span style={{ marginBottom: "1em", display: "block" }}>
          <TextField
            label="Nombre"
            name="nombre"
            style={{ ...TextFieldStyles, marginBottom: "0" }}
            onChange={handleData}
            value={data.nombre}
            disabled={disabled}
          />
          {data.nombre === "" && (
            <span style={{ color: "#4052b6", fontSize: ".75em" }}>
              Por favor, completa aqui
            </span>
          )}
        </span>
        <span style={{ marginBottom: "1em", display: "block" }}>
          <TextField
            label="Email"
            name="email"
            style={{ ...TextFieldStyles, marginBottom: "0" }}
            onChange={handleData}
            value={data.email}
            error={error.email}
            disabled={disabled}
          />
          {error.email && (
            <span style={{ color: "#4052b6", fontSize: ".75em" }}>
              Por favor corrige aqui
            </span>
          )}
        </span>
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          style={TextFieldStyles}
          onChange={handleData}
          value={data.password}
          disabled={disabled}
        />
        <span>
          <TextField
            label="Reescribe contraseña"
            name="password_c"
            type="password"
            style={TextFieldStyles}
            error={passwords.password !== passwords.password_c}
            onChange={handlePasswords}
            disabled={disabled}
          />
          {passwords.password !== passwords.password_c && (
            <span style={{ color: "#4052b6", fontSize: ".75em" }}>
              Las contraseñas no coinciden
            </span>
          )}
        </span>
        {/*<Button 
                    variant='contained' 
                    style={{...TextFieldStyles, boxShadow:'none'}}
                    onClick={handleRegister}
                    disabled={(disabled || passwords.password!==passwords.password_c || error.email || (data.email==='' || data.password==='' || data.nombre==='' || passwords.password_c===''))}
                >
                    Crear cuenta
                </Button>*/}
        {disabled && (
          <div style={{ width: "100%", textAlign: "center", padding: "1em 0" }}>
            <CircularProgress />
          </div>
        )}
        <Button
          className="create-btn pointer"
          onClick={handleRegister}
          disabled={
            disabled ||
            passwords.password !== passwords.password_c ||
            error.email ||
            data.email === "" ||
            data.password === "" ||
            data.nombre === "" ||
            passwords.password_c === ""
          }
        >
          <CheckCircleIcon />
        </Button>
      </section>
      <Dialog
        open={open}
        handleClose={handleClose}
        message="Lo siento ocurrio un error"
      />
      <Dialog
        open={ok}
        handleClose={handleRedirect}
        message="El usuario fue creado exitosamente"
        CloseText="Login"
      />
    </div>
  );
};

export default Register;
