import React, { useState, useEffect } from "react";
import Drawer from "../../Components/Drawer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BackupIcon from "@material-ui/icons/Backup";
import dog from "../../Assets/img/dog-blue.svg";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import { useHistory } from "react-router-dom";

import {
  CircularProgress,
  TextField,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import "./styles.scss";

import { UpdatePet } from "../../Services/Pet";

const TextFieldStyles = {
  marginBottom: "1em",
  width: "100%",
};

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const EditPet = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    chip: null,
    id_caracter: null,
    id_pelaje: null,
    id_raza: null,
    id_sexo: null,
    nacimiento: null,
    nombre: "",
    notas: null,
    peso: null,
    thumb: 0,
    id_veterinaria: null,
    es_principal: 1,
    id_propietario: "",
    deceso: false,
    date: null,
  });

  const [sesion, setSesion] = useState(null);

  const [fetching, setFetching] = useState(false);

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
      setSesion(localSesion);
      //console.log('edit pet sesion',localSesion);
    }
    //console.log('props edit pet', props);
    if (props.data.propietarios === undefined)
      setData({
        ...props.data,
        id_veterinaria: localSesion.veterinary.id,
        propietarios: [{ id: props.id_propietario }],
      });
    else setData({ ...props.data, id_veterinaria: localSesion.veterinary.id });
  }, []);

  const handleData = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    //console.log(name, value)
    setData({ ...data, [name]: value });
  };

  const handleDate = (date) => {
    console.log(formatDate(date));
    setData({ ...data, nacimiento: formatDate(date), date: date });
  };

  const handleCheck = (event) => {
    let value = event.target.checked;
    let name = event.target.name;
    //console.log(name, value)
    setData({ ...data, [name]: value });
  };

  const handleUpdate = () => {
    console.log(props.data);
    setFetching(true);
    UpdatePet(
      props.sesion.access_token,
      data,
      (resp) => {
        console.log(resp);
        props.onUpdate(resp);
        setFetching(false);
      },
      (error) => {
        console.error(error);
        setFetching(false);
      }
    );
  };

  return (
    <Drawer open={props.open} anchor="bottom" className="edit-pet-wrapper">
      <div className="new-pet-header header">
        <div className="header-title">
          <span onClick={props.onClose} className="close-btn">
            <ArrowBackIcon />
          </span>
          <span className="dog-img">
            <img src={dog} alt="dog" style={{ width: "100%" }} />
          </span>
          <span style={{ marginLeft: "1em" }}>
            <span className="pet-header-title">{props.data.nombre}</span>
            <span className="pet-header-subtitle">Editando mascota</span>
          </span>
        </div>
        <span className="add-pet-btn" onClick={handleUpdate}>
          <BackupIcon />
        </span>
      </div>
      <div>
        {props.races !== null &&
        props.races !== undefined &&
        props.furs !== null &&
        props.furs !== undefined &&
        props.characteres !== null &&
        props.characteres !== undefined &&
        props.sexes !== null &&
        props.sexes !== undefined &&
        !fetching ? (
          <span className="add-pet-form">
            <TextField
              label="Nombre"
              name="nombre"
              style={TextFieldStyles}
              onChange={handleData}
              value={data.nombre}
            />

            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="race">Raza</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: "id_raza",
                  id: "race",
                }}
                style={TextFieldStyles}
                value={data.id_raza}
              >
                <option value="" />
                {props.races.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.nombre}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="fur">Pelaje</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: "id_pelaje",
                  id: "fur",
                }}
                style={TextFieldStyles}
                value={data.id_pelaje}
              >
                <option value="" />
                {props.furs.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.nombre}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="sex">Sexo</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: "id_sexo",
                  id: "sex",
                }}
                style={TextFieldStyles}
                value={data.id_sexo}
              >
                <option value="" />
                {props.sexes.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.nombre}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="character">Caracter</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: "id_caracter",
                  id: "character",
                }}
                style={TextFieldStyles}
                value={data.id_caracter}
              >
                <option value="" />
                {props.characteres.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.nombre}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <KeyboardDatePicker
              margin="normal"
              format="MM/dd/yyyy"
              label="Nacimiento"
              name="nacimiento"
              value={data.date}
              onChange={handleDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              style={TextFieldStyles}
            />

            <TextField
              label="Peso"
              name="peso"
              style={TextFieldStyles}
              onChange={handleData}
              value={data.peso}
            />
            <div className="chip">
              <TextField
                label="Chip"
                name="chip"
                style={TextFieldStyles}
                onChange={handleData}
                value={data.chip}
              />
              <span className="bar-code">
                <ViewHeadlineIcon />
              </span>
            </div>
            <TextField
              label="Notas"
              name="notas"
              style={TextFieldStyles}
              onChange={handleData}
              value={data.notas}
            />
            <div style={TextFieldStyles} className="check-box">
              <Checkbox
                checked={data.deceso}
                onChange={handleCheck}
                name="deceso"
              />
              <span>Deceso</span>
            </div>
          </span>
        ) : (
          <span className="circular-progress">
            <CircularProgress />
          </span>
        )}
      </div>
    </Drawer>
  );
};

export default EditPet;
