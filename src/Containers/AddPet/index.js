import  { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import Dialog from "../../Components/Dialog";
import { GetRace, GetFur, GetSex, GetCharacter } from "../../Services/Pet";
import { AddPet as AddService } from "../../Services/Pet";
import { GetOwnersMin } from "../../Services/Owner";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackupIcon from '@mui/icons-material/Backup';
import dog from "../../Assets/img/dog-blue.svg";
import {
  CircularProgress,
  TextField,
  Checkbox,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";

import { KeyboardDatePicker } from "@material-ui/pickers";

import "./styles.scss";

const TextFieldStyles = {
  marginBottom: "1em",
  width: "100%",
};

const AddPet = (props) => {
  const history = useHistory();
  //const [open, setOpen] = useState(false);

  const [sesion, setSesion] = useState(null);
  const [races, setRaces] = useState(null);
  const [furs, setFurs] = useState(null);
  const [sexes, setSexes] = useState(null);
  const [characteres, setCaracteres] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [owners, setOwners] = useState(null);
  const [errorCreate, setErrorCreate] = useState(false);

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
      GetRace(localSesion.access_token, (data) => {
        //console.log('razas', data)
        setRaces(data);
      });

      GetFur(localSesion.access_token, (data) => {
        //console.log('fur', data)
        setFurs(data);
      });

      GetSex(localSesion.access_token, (data) => {
        //console.log('sex', data)
        setSexes(data);
      });

      GetCharacter(localSesion.access_token, (data) => {
        //console.log('char', data)
        setCaracteres(data);
      });

      GetOwnersMin(
        localSesion.access_token,
        localSesion.x_usuarios_veterinarias.id_veterinaria,
        (data) => {
          //console.log(data)
          setFetching(false);
          setOwners(data);
        }
      );

      setData({ ...data, id_veterinaria: localSesion.veterinary.id });
    }
  }, []);

  const add = () => {
    console.log(data);
    if (
      !fetching &&
      /*data.chip!=='' && data.id_caracter!=='' && data.id_pelaje!=='' && data.id_raza!=='' && data.id_sexo!=='' && data.nacimiento!=='' && */ data.nombre !==
        "" &&
      data.id_propietario !==
        "" /*&& data.notas!=='' && data.peso!=='' && data.id_veterinaria!=='' && data.id_propietario!==''*/
    ) {
      setFetching(true);
      AddService(
        sesion.access_token,
        data,
        (resp) => {
          console.log(resp);

          if (!/You have an error/.test(resp)) {
            setFetching(false);
            //              setNewPetOpen(!newPetOpen);
            setData({
              ...data,
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
              es_principal: 1,
              id_propietario: "",
              deceso: false,
              date: null,
            });
            props.updatePets(resp);
          } else {
            console.error(resp);
            setErrorCreate(true);
            setFetching(false);
          }
        },
        (error) => {
          setFetching(false);
        }
      );
    } else {
      console.log(data);
    }
  };

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

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const hanldeCloseError = () => {
    setErrorCreate(false);
  };

  return (
    <div className="addpet-wrapper">
      <Drawer open={props.open} className={"add-pet-container"}>
        <div className="new-pet-header header">
          <div className="header-title">
            <span onClick={props.onClose} className="close-btn">
              <ArrowBackIcon />
            </span>
            <span className="dog-img">
              <img src={dog} alt="dog" style={{ width: "100%" }} />
            </span>
            <span style={{ marginLeft: "1em" }}>
              <span className="pet-header-title">Nueva mascota</span>
              <span className="pet-header-subtitle">
                Ingresando nueva mascota
              </span>
            </span>
          </div>
          <span className="add-pet-btn" onClick={add}>
            <BackupIcon />
          </span>
        </div>
        {races !== null &&
        furs !== null &&
        sexes !== null &&
        characteres !== null &&
        owners !== null &&
        !fetching ? (
          <span className="add-pet-form">
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="race">Propietario</InputLabel>
              <Select
                native
                //value={state.age}
                onChange={handleData}
                inputProps={{
                  name: "id_propietario",
                  id: "id_propietario_newpet",
                }}
                style={TextFieldStyles}
                value={data.id_propietario}
              >
                <option value="" />
                {owners.map((data) => {
                  return (
                    <option key={data.id} value={data.id}>
                      {data.nombre}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

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
                {races.map((data) => {
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
                {furs.map((data) => {
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
                {sexes.map((data) => {
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
                {characteres.map((data) => {
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
        <Dialog
          open={errorCreate}
          message="Ha ocurrido un error creando la mascota"
          handleClose={hanldeCloseError}
        />
      </Drawer>
    </div>
  );
};
export default AddPet;
