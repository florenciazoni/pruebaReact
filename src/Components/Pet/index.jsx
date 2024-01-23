import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer/Drawer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import { Tab } from '@mui/material';
import Typography from '@mui/material/Typography'

import PersonIcon from '@mui/icons-material/Person';
import { Box, CircularProgress, Checkbox } from "@mui/material";

import dog from "../../Assets/img/dog-blue.svg";

import Dialog from "../Dialog";

import { DeletePet, GetPet } from "../../Services/Pet";

import EditPet from "../../Containers/EditPet";

import "./styles.scss";
import SubMenu from "../Menu/SubMenu/index";

const PetNameStyle = {
  color: "#fff",
  padding: "1em",
  paddingLeft: "0",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Menu(props) {
  const history = useHistory();

  const [state, setState] = React.useState({
    open: false,
    newPetFlag: true,
  });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [closeMenu, setCloseMenu] = React.useState(false);
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    if (state.open) {
      getData();
    }
  }, [state.open]);

  const getData = () => {
    setFetching(true);
    GetPet(
      props.sesion.access_token,
      props.sesion.x_usuarios_veterinarias.id_veterinaria,
      props.data.id,
      (data) => {
        setPetData(data);
        setState({ ...state, newPetFlag: props.open });
        setFetching(false);
      }
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setState({ ...state, open: false, newPetFlag: false });
  };

  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  const deletePet = () => {
    let dataAux = {
      id_mascota: petData.id,
      id_veterinaria: props.sesion.veterinary.id,
      token: props.sesion.access_token,
    };
    //console.log(dataAux)
    setFetching(true);
    DeletePet(
      dataAux,
      (resp) => {
        console.log(resp);
        props.onDelete();
        setState({ ...state, open: false });
        setFetching(false);
      },
      (error) => {
        setFetching(false);
      }
    );
  };

  const handleOpenDialog = () => {
    setCloseMenu(!closeMenu);
    setOpenDialog(!openDialog);
  };

  const handleOpenEdit = () => {
    setCloseMenu(!closeMenu);
    setOpenEdit(!openEdit);
  };

  const handleUpdate = (resp) => {
    props.onUpdate(resp);
    handleOpenEdit();
    getData();
  };

  return (
    <div className="pet-wraper">
      {/*console.log(petData)*/}
      <span className="pointer" onClick={handleOpen}>
        {props.children}
      </span>

      <Drawer
        open={!state.open ? props.open && state.newPetFlag : state.open}
        onClose={handleClose}
        className="pet-drawer"
      >
        {petData ? (
          <>
            <div>
              <div className="pet-header">
                <div>
                  <ArrowBackIcon
                    style={{ color: "#fff", cursor: "pointer" }}
                    onClick={handleClose}
                  />
                  <div className="pet-data">
                    <span className="dog-img">
                      <img src={dog} alt="dog" style={{ width: "100%" }} />
                    </span>
                    <span style={PetNameStyle}>{petData.nombre}</span>
                  </div>
                </div>
                {/*<div>
                  <span><DeleteIcon/></span>
                </div>*/}

                {/* <span className="header-crud">
              <span onClick={handleOpenEdit}>
                <CreateIcon />
              </span>
              <span onClick={handleOpenDialog} className="pointer">
                <DeleteIcon />
              </span>
            </span> */}
              </div>

              <div className="pet-info">
                <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                    >
                      <Tab label="Mascota" {...a11yProps(0)} />
                      {/*<Tab label="Clínica" {...a11yProps(1)} />
                      <Tab label="Suministro" {...a11yProps(2)} />*/}
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    {!fetching ? (
                      <div className="pet-info-basic">
                        {petData.propietarios !== undefined && (
                          <div>
                            {petData.propietarios.map((d) => {
                              return (
                                <div key={d.id} className="pet-avatar">
                                  <span className="dog-img">
                                    <PersonIcon />
                                  </span>
                                  <div className="pet-avatar-info">
                                    <span>{d.nombre}</span>
                                    <span>Información</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div className="pet-details">
                          <div className="item-detail">
                            <span className="title">Nombre</span>
                            <span>{petData.nombre}</span>
                          </div>
                          <div className="item-detail">
                            <span className="title">Raza</span>
                            <span>{petData.nombre_raza}</span>
                          </div>
                          <div className="item-detail">
                            <span className="title">Pelaje</span>
                            <span>{petData.nombre_pelaje}</span>
                          </div>
                          <div className="item-detail">
                            <span className="title">Sexo</span>
                            <span>{petData.nombre_sexo}</span>
                          </div>
                          <div className="item-detail">
                            <span className="title">Caracter</span>
                            <span>{petData.nombre_caracter}</span>
                          </div>
                          <div className="item-detail">
                            <span className="title">Nacimiento</span>
                            <span>{petData.nacimiento}</span>
                          </div>
                          <div className="item-detail">
                            <span className="title">Peso</span>
                            <span>{petData.peso}</span>
                          </div>
                          <div className="item-detail">
                            <span className="title">Chip</span>
                            <span>{petData.chip}</span>
                          </div>
                          <div className="item-detail">
                            <span className="title">Notas</span>
                            <span>{petData.notas}</span>
                          </div>

                          <div className="item-detail item-detail-deseso">
                            <Checkbox
                              checked={petData.deceso + "" === "1"}
                              name="deceso"
                              disabled={true}
                            />
                            <span>Deceso</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="spiner-container">
                        <CircularProgress />
                      </span>
                    )}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    Item Three
                  </TabPanel>
                </div>
              </div>
            </div>
            <Dialog
              open={openDialog && !fetching}
              message="¿Eliminar?"
              handleClose={handleOpenDialog}
              okText="OK"
              CloseText="CANCELAR"
              handleOk={deletePet}
            />

            <SubMenu
              isPets
              edit={handleOpenEdit}
              delete={handleOpenDialog}
              open={closeMenu}
            />
            <EditPet
              open={openEdit}
              data={petData}
              onClose={handleOpenEdit}
              races={props.races}
              furs={props.furs}
              sexes={props.sexes}
              characteres={props.characteres}
              sesion={props.sesion}
              onUpdate={handleUpdate}
              id_propietario={props.id_propietario}
            />
          </>
        ) : (
          <span className="spiner-container">
            <CircularProgress />
          </span>
        )}
      </Drawer>
    </div>
  );
}
