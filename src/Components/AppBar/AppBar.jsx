
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


import TemporaryDrawer from '../Drawer/Drawer';

const InicioTypography = () => {
    return (
      <Typography variant="h6" component="div" sx={{ flexGrow: 1,marginLeft: '16px' }}>
        Inicio
      </Typography>
    );
  };

export default function ButtonAppBar() {
    
  return (
    <Box color="primary" sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" >
        <Toolbar>
          
            <TemporaryDrawer/>
            <InicioTypography />
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}