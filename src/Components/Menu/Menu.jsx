

import { Container, Paper, Typography, useTheme } from '@mui/material';
import FechaDesdeAPI from './FechaApi';

const CentroEnPagina = () => {
  const theme = useTheme();

  return (
    <Container
    maxWidth="lg"
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: theme.spacing(50),
      paddingRight: theme.spacing(2),
      paddingBottom: '70vh',
      margin: 'auto', // Centra el contenedor horizontalmente
      [theme.breakpoints.up('sm')]: {
        width: '50%', // Ancho del contenedor para pantallas de más de 600px
      },
      [theme.breakpoints.up('md')]: {
        width: '40%', // Ancho del contenedor para pantallas de más de 900px
      },
    }}
    >
      <Paper elevation={3} style={{ padding: theme.spacing(4), width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          <FechaDesdeAPI />
        </Typography>
      </Paper>
    </Container>
  );
};

export default CentroEnPagina;
