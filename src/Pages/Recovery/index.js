import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.scss";
import { validateEmail } from "../../Validator";
import { Recovery as RecoveryService } from "../../Services/Recovery";
import Dialog from "../../Components/Dialog";

import { TextField, Button, CircularProgress } from "@material-ui/core";

const TextFieldStyles = {
  marginBottom: "1em",
  width: "100%",
};

const Recovery = (props) => {
  const history = useHistory();

  const [data, setData] = useState({ email: "" });
  const [error, setError] = useState(false);
  const [modal, setModal] = useState({ ok: false, error: false });

  const [disabled, setDisabled] = useState(false);

  const handleData = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setData({ ...data, [name]: value });
    setError(!validateEmail(value));
  };

  const handleRequest = () => {
    setDisabled(true);
    RecoveryService(
      data.email,
      (data) => {
        setModal({ ...modal, ok: true });
        console.log(data);
        setDisabled(false);
      },
      (error) => {
        setModal({ ...modal, error: true });
        console.error(error);
        setDisabled(false);
      }
    );
  };

  const handleRedirect = () => {
    setModal({ ...modal, ok: false });
    history.push("/");
  };

  const handleClose = () => {
    setModal({ ...modal, error: false });
  };

  return (
    <div className="recovery-wrapper">
      <div className="user-email">
        <span>
          <TextField
            label="Email"
            name="email"
            style={TextFieldStyles}
            value={data.email}
            onChange={handleData}
            disabled={disabled}
            error={error}
          />
          {error && (
            <span style={{ fontSize: ".75em" }}>Por favor corrige aqui</span>
          )}
        </span>
        <Button
          variant="contained"
          style={{ width: "100%", boxShadow: "none" }}
          disabled={disabled || data.email === "" || error}
          onClick={handleRequest}
        >
          Enviar
        </Button>
        {disabled && (
          <div style={{ width: "100%", textAlign: "center", padding: "1em 0" }}>
            <CircularProgress />
          </div>
        )}
      </div>
      <Dialog
        open={modal.error}
        handleClose={handleClose}
        message="Lo siento ocurrio un error"
      />
      <Dialog
        open={modal.ok}
        handleClose={handleRedirect}
        message="Email enviado exitosamente"
        CloseText="Ok"
      />
    </div>
  );
};
export default Recovery;
