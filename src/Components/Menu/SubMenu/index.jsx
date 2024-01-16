import { Box, Grid, Link, Modal } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import {
 
  AddCircle,
 
  

 
 
} from "@mui/icons-material";
import "./styles.scss";

import PetsIcon from "@mui/icons-material/Pets";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import AddTaskIcon from '@mui/icons-material/AddTask';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';



export default function SubMenu(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [props.open]);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        //  aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box className="contentModal">
          {props.isPets || (
            <>
            
              <div className="titleSubmemu">Más Usados</div>
              <Grid container alignItems="center">
                <Grid xs={3}>
                  <Link
                    onClick={props.edit}
                    className="with-icon"underline="none"
                    sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}
                  >
                    <PetsIcon
                      sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}
                    />
                    Nuevo Paciente
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                <Link
                    onClick={props.edit}
                    className="with-icon"underline="none"
                    sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}
                  >
                    <PetsIcon
                      sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}
                    />
                    Buscar Paciente
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                <Link
                    onClick={props.edit}
                    className="with-icon"underline="none"
                    sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}
                  >
                    <PersonAddAltIcon
                      sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}
                    />
                    Nuevo Dueño
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                <Link
                    onClick={props.edit}
                    className="with-icon"underline="none"
                    sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}
                  >
                    <PersonSearchIcon
                      sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}
                    />
                    Buscar Dueño
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link
                    onClick={props.edit}
                    className="with-icon"underline="none"
                    sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}
                  >
                    <ManageSearchIcon
                      sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}
                    />
                    Buscar Producto
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link
                    onClick={props.edit}
                    className="with-icon"underline="none"
                    sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}
                  >
                    <PointOfSaleIcon
                      sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}
                    />
                    Venta
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link
                    onClick={props.edit}
                    className="with-icon"underline="none"
                    sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}
                  >
                    <AccountBalanceWalletOutlinedIcon
                      sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}
                    />
                    Gasto
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link
                    onClick={props.edit}
                    className="with-icon"underline="none"
                    sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}
                  >
                    <AddTaskIcon 
                      sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}
                    />
                    Nuevo Agenda
                  </Link>
                </Grid>

              </Grid>
              
            </>
          )}
          {props.isOwner || (
            <>
              <div className="titleSubmemu">Otros</div>
              <Grid container alignItems="center">
                <Grid xs={3}>
                  <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <LocalGroceryStoreOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Compra
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <PaymentsOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Ingreso / Egreso manual
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <ListAltOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Importar Productos
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <SyncAltOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Asociar Productos
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <Inventory2OutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Nuevo Producto
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <LocalHospitalOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Nuevo Servicio
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <LocalShippingOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Nuevo Distribuidor
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <LocalShippingOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Buscar Distribuidor
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <FactoryOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Buscar Fabricante
                  </Link>
                </Grid>
                <Grid className="with-icon" xs={3} sx={{ marginTop: '20px' }}>
                <Link onClick={props.edit} className="with-icon" underline="none" sx={{
                      display: "flex", // Asegura que el ícono y el texto estén en línea
                      alignItems: "center", // Alinea el ícono y el texto verticalmente
                      gap: "8px",
                      color: "grey",
                      fontWeight: 'bold' // Espacio entre el ícono y el texto
                    }}>
                    <ArrowForwardOutlinedIcon className="borderIcon"  sx={{
                        borderRadius: "50%",
                        border: "2px solid grey", // Borde de 2 píxeles de ancho, color gris
                        padding: "10px", // Agrega un relleno de 10 píxeles
                        fontSize: "3rem",
                        color: "grey",
                      }}/>
                    Remito
                  </Link>
                </Grid>
              </Grid>
             
            </>
          )}
        
         
        
        </Box>
      </Modal>
      <span className="plus-menu" onClick={() => setOpen(true)}>
        <AddCircle />
      </span>
    </>
  );
}
SubMenu.propTypes = {
  open: PropTypes.bool,
  isPets: PropTypes.bool,
  isOwner: PropTypes.bool,
  edit: PropTypes.func,
  delete: PropTypes.func,
  option2: PropTypes.func,
  addPet: PropTypes.func,
  addOwner: PropTypes.func,
};
