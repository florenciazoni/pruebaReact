import * as React from "react";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import "./styles.css";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import ListItemText from "@mui/material/ListItemText";

import { Container, CssBaseline, ListItemIcon, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
const theme = createTheme({typography: {
  lista: {
    fontWeight: 500,
  },

}})


export default function TemporaryDrawer() {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ left: open });
  };

  const list = () => (
    <Container
      className="contenedorPrincipal"
      sx={{
        margin: '0',
        padding: '0 !important', // Elimina los márgenes izquierdos y derechos
       
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className="listaUsuario" sx={{ backgroundColor :"#4052b6;", margin: '0',overflow: 'visible', }}>
        {["Veterinaria", "Usuario"].map((text, index) => (
          <ListItem key={text} disablePadding sx={{ width: 250, margin: '0' }}>
            <ListItemButton sx={{ width: 250, margin: '0'  }}>
              <ListItemIcon sx={{ marginRight: "-20px" }}>
                {index === 0 ? <StoreIcon sx={{color: 'white'}}/> : <AccountCircleIcon sx={{color: 'white'}}/>}
              </ListItemIcon>
              <ListItemText  primary={text} sx={{ fontWeight: 'bold' }}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List className="lista" sx={{fontWeight: 'bold'}}>
        {["Inicio", "Pacientes", "Dueños", "Agenda"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} fontWeight=  'bold !important'/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {["Caja diaria", "Reportes"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText className="lista" primary={text} s/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        {["Acerca de Doctor Vet"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText className="lista" primary={text}  />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
  

  return (
    <div>
       <ThemeProvider theme={theme}><CssBaseline />
      <React.Fragment key={"left"}>
        <MenuIcon onClick={toggleDrawer(true)} />
        <Drawer anchor={"left"} open={state.left} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
      </ThemeProvider>
    </div>
  );
}
