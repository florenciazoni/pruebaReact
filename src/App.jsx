
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './App.css'
import ButtonAppBar from './Components/AppBar/AppBar'
import SubMenu from './Components/Menu/SubMenu'







const theme = createTheme({
  palette: {
    primary: {
      main: "#4052b6",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontWeight: 500,  // Esto establece el peso de la fuente en negrita
  }
});

function App() {
  

  return (
    <>
   
   <ThemeProvider theme={theme}><CssBaseline /> <ButtonAppBar/>
     <SubMenu/>
     
     
     
     
     
     </ThemeProvider>
    
     
     
    </>
  )
}

export default App