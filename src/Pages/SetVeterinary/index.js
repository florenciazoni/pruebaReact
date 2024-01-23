import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CircularProgress,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import config from "../../Assets/localConfig.json";
import Dialog from "../../Components/Dialog";

import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import StoreIcon from "@material-ui/icons/Store";
import BackupIcon from "@material-ui/icons/Backup";
import Veterinary from "../../Components/Veterinary";
import "./styles.scss";

import { GetVeterinaries, JoinVet, CreateVet } from "../../Services/Veterinary";
import { GetRegions } from "../../Services/Regions";

import { validateEmail } from "../../Validator";

const TextFieldStyles = {
  marginBottom: "1em",
  width: "100%",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: "100%",
    marginBottom: "1em",
  },
  selectEmpty: {},
}));

const SetVeterinary = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const [sesion, setSesion] = useState(null);
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRegions, setLoadingRegions] = useState(false);
  const [vet, setVet] = useState(null);
  const [option, setOption] = useState(null);
  const [regions, setRegions] = useState([]);
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState({
    direccion: "",
    email: "",
    id_region: "",
    nombre: "",
    nombre_region: "",
    notas: "",
    pagina_web: "",
    propietario: "",
    telefono: "",
    thumb: 0,
    sistema_unidades: "",
  });
  const [error, setError] = useState({
    email: false,
  });
  const [status, setStatus] = useState(false);
  const [checked, setChecked] = useState(false);
  const [vetAux, setVetAux] = useState(null);

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
      setData({
        ...data,
        id_usuario: localSesion.id,
        sistema_unidades: config.sistemas_medidas.METRICO_DECIMAL,
      });
      GetVeterinaries(
        localSesion.id,
        localSesion.access_token,
        (data) => {
          setVets(data);
          setLoading(false);
          //console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
      GetRegions(
        localSesion.access_token,
        (data) => {
          setRegions(data);
          setLoadingRegions(false);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleVet = (d) => {
    setVetAux(d.id);
    setOpen(true);
  };

  const handleJoinVet = () => {
    setChecked(true);
    setOpen(false);
    setFetching(true);
    setVet(vetAux);
    console.log(vetAux);
    JoinVet(
      { id_usuario: sesion.id, id_veterinaria: vetAux },
      sesion.access_token,
      (data) => {
        console.log("join response", data);
        setFetching(false);
      }
    );
  };

  const handleLogin = () => {
    /*LoginService({...userData, tipo_login:'EMAIL'}, (data) => {
            console.log(data);
            //if(data.usuario.id_x_usuarios_veterinarias_en_uso!==null)
            if(data.response==='ACCOUNT_WAITING_FOR_EMAIL_CHECK'){
                return;
            }
            //localStorage.setItem('sesion', JSON.stringify(data.usuario));
            //history.push('/dashboard');
        },
        (error)=>{
            console.error('login',error);
            setErrorMessage({status:true, message:error});
            setDisabled(false);
        });*/
    console.log("pushing to dashboard app");
    history.push("/dashboard");
  };

  const handleOption = (data) => {
    setOption(data);
  };

  const handleAddVet = () => {
    //console.log(!validateEmail(data.email));
    setError({ ...error, email: !validateEmail(data.email) });
    if (fetching || status) return;

    if (
      validateEmail(data.email) &&
      data.email !== "" &&
      data.nombre !== "" &&
      !status
    ) {
      setFetching(true);
      CreateVet(
        data,
        sesion.id,
        sesion.access_token,
        (data) => {
          // console.log("response CreateVet", data);
          if (/^[0-9]*/.test(data)) {
            //debugger;
            setStatus(true);
            data = JSON.parse(data);
            localStorage.setItem(
              "sesion",
              JSON.stringify({
                ...JSON.parse(localStorage.getItem("sesion")),
                id_x_usuarios_veterinarias_en_uso: data,
                x_usuarios_veterinarias: {
                  id_veterinaria: data.id_veterinaria_deposito,
                },
              })
            );
            handleLogin();
          }
          setFetching(false);
        },
        (error) => {
          setFetching(false);
          console.error(error);
        }
      );
    }
  };
  /*buenas noches elias como estas, estoy trabajando en el frlujo de un usuario sin veterinaria asociada.
mañana en la tarde podemos conversar sobre los datos de sesion.
pero te comento para que madures la idea y mañana me des tu opinion, en la app web a diferencia de la app movil es mucho mas facil acceder a los datos de la sesion asi esten encriptados, y tambien el codigo JS de decifrado se encuentra accesible a los usarios desde el navegador, asi que cualquier sesion puede ser vista por cualquiera con conocimiento de que eso esta allí, entonces no se si quieres seguir manejando las mismas politicas para las sesiones que la app movil o quisieras hacer alguna modificacion  */
  const handleData = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    //console.log(data)
    if (name === "id_region") {
      let aux = value.split("*vet*");
      setData({ ...data, id_region: aux[0], nombre_region: aux[1] });
      return;
    }
    setData({ ...data, [name]: value });
  };

  return (
    <div className="set-vet-wrapper">
      {option === null && (
        <div className="select-option">
          <Button
            variant="contained"
            style={{ width: "100%", boxShadow: "none", marginBottom: "1em" }}
            onClick={() => handleOption(true)}
          >
            Crear Veterinaria
          </Button>
          <Button
            variant="contained"
            style={{ width: "100%", boxShadow: "none" }}
            onClick={() => handleOption(false)}
          >
            Unirse a veterinaria
          </Button>
        </div>
      )}
      {option === false && (
        <React.Fragment>
          <div className="login-vet-header">
            <span className="controls">
              <ArrowBackIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleOption(null)}
              />
              <div className="title">
                <span>Veterinarias</span>
                <span style={{ fontSize: ".75em" }}>Unirse a veterinaria</span>
              </div>
            </span>
            <span>{/*<SearchIcon/>*/}</span>
          </div>
          <div className="existing-vet">
            {loading || fetching ? (
              <span className="spiner">
                <CircularProgress />
              </span>
            ) : (
              <div style={{ width: "100%" }}>
                {vets.map((data) => {
                  //console.log(data.id,vet,data.id===vet)
                  return (
                    <Veterinary
                      name={data.nombre}
                      email={data.email}
                      key={data.id}
                      active={data.id === vet && checked}
                      onClick={() => handleVet(data)}
                    />
                  );
                })}
              </div>
            )}
            {/*<Button
                        variant="contained"
                        style={{width:'calc(100% - 1em)', boxShadow:'none', margin:'1em .5em .5em .5em'}}
                        disabled={vet===null}
                        onClick={handleJoinVet}
                    >
                        Aceptar
                    </Button>*/}
          </div>
          <Dialog
            open={open}
            CloseText={"Cancelar"}
            okText={"Unirse"}
            handleClose={handleClose}
            handleOk={handleJoinVet}
          >
            <div style={{ textAlign: "center" }}>
              <h3>¿Unirse a veterinaria?</h3>
              <p style={{ textAlign: "center" }}>
                En caso de unirse se enviara una solicitud a la veterinaria
                elegida
              </p>
            </div>
          </Dialog>
        </React.Fragment>
      )}
      {option === true && (
        <span>
          {loadingRegions || fetching ? (
            <span className="spiner">
              <CircularProgress />
            </span>
          ) : (
            <React.Fragment>
              <div className="login-vet-header">
                <span className="controls">
                  <ArrowBackIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOption(null)}
                  />
                  <span className="icon-wrapper">
                    <StoreIcon />
                  </span>
                  <div className="title" style={{ marginLeft: ".5em" }}>
                    <span>Nueva veterinaria</span>
                    <span style={{ fontSize: ".75em" }}>
                      Ingresando nueva veterinaria
                    </span>
                  </div>
                </span>
                <span
                  style={{ fontSize: "1.5em" }}
                  onClick={handleAddVet}
                  className="pointer"
                >
                  <BackupIcon style={{ fontSize: "1.5em" }} />
                </span>
              </div>
              <div className="create-vet">
                <span>
                  <TextField
                    label="Nombre"
                    name="nombre"
                    style={{ ...TextFieldStyles, marginBottom: "0" }}
                    value={data.nombre}
                    onChange={handleData}
                    /*disabled={disabled}*/
                  />
                  {data.nombre === "" && (
                    <span style={{ color: "#4052b6", fontSize: ".75em" }}>
                      Por favor, completa aqui
                    </span>
                  )}
                </span>
                <TextField
                  label="Dirección"
                  name="direccion"
                  style={TextFieldStyles}
                  value={data.direccion}
                  onChange={handleData}
                  /*disabled={disabled}*/
                />
                <FormControl className={classes.formControl}>
                  <InputLabel>Región</InputLabel>
                  <Select
                    value={data.id_region + "*vet*" + data.nombre_region}
                    onChange={handleData}
                    name="id_region"
                  >
                    {regions.content.map((region) => {
                      return (
                        <MenuItem
                          value={region.id + "*vet*" + region.nombre_region}
                          key={region.id}
                        >
                          {region.nombre_region}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {/*<TextField 
                            label="Región" 
                            name='id'
                            style={TextFieldStyles}
                            value={data.id}
                            onChange={handleData}
                            disabled={disabled}
                        />*/}
                <TextField
                  label="Teléfono"
                  name="telefono"
                  style={TextFieldStyles}
                  value={data.telefono}
                  onChange={handleData}
                  /*disabled={disabled}*/
                />
                <span>
                  <TextField
                    label="Email"
                    name="email"
                    style={TextFieldStyles}
                    value={data.email}
                    onChange={handleData}
                    /*disabled={disabled}*/
                  />
                  {data.email === "" && (
                    <span style={{ color: "#4052b6", fontSize: ".75em" }}>
                      Por favor, completa aqui
                    </span>
                  )}
                  {error.email && (
                    <span style={{ color: "#4052b6", fontSize: ".75em" }}>
                      Por favor, corrige aqui
                    </span>
                  )}
                </span>
                <TextField
                  label="Propietario"
                  name="propietario"
                  style={TextFieldStyles}
                  value={data.propietario}
                  onChange={handleData}
                  /*disabled={disabled}*/
                />
                <TextField
                  label="Pagina web"
                  name="pagina_web"
                  style={TextFieldStyles}
                  value={data.pagina_web}
                  onChange={handleData}
                  /*disabled={disabled}*/
                />
                <TextField
                  label="Notas"
                  name="notas"
                  style={TextFieldStyles}
                  value={data.notas}
                  onChange={handleData}
                  /*disabled={disabled}*/
                />

                <FormControl component="fieldset">
                  <FormLabel component="legend">Sistemas de medidas</FormLabel>
                  <RadioGroup
                    row
                    aria-label="sistema_unidades_"
                    name="sistema_unidades"
                    defaultValue={config.sistemas_medidas.METRICO_DECIMAL}
                    onChange={handleData}
                  >
                    <FormControlLabel
                      value={config.sistemas_medidas.METRICO_DECIMAL}
                      control={<Radio color="#3f51b5" />}
                      label="Metrico decimal"
                    />
                    <FormControlLabel
                      value={config.sistemas_medidas.INGLES}
                      control={<Radio color="#3f51b5" />}
                      label="ingles"
                    />
                  </RadioGroup>
                </FormControl>

                {/*<Button
                            variant="contained"
                            style={{width:'calc(100% - 1em)', boxShadow:'none', margin:'1em .5em .5em .5em'}}
                            disabled={data.direccion==='' || data.email==='' || data.id==='' || data.nombre==='' || data.nombre_region==='' || data.notas==='' || data.pagina_web==='' || data.propietario==='' || data.telefono===''}
                            onClick={handleAddVet}
                        >
                            Aceptar
                        </Button>*/}
              </div>
            </React.Fragment>
          )}
        </span>
      )}
    </div>
  );
};
export default SetVeterinary;
