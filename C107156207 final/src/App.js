import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import { Actions } from "./Actions";
import { Provider } from "./Context";
import theme from 'src/theme';
import routes from 'src/routes';
import {useState} from "react";


const App = () => {
  const routing = useRoutes(routes);
  const data= Actions();
  const [userheadpic ,setUserheadpic]=useState({id:'',name:'',job:'',dept:''})
  const headpic={...data,userheadpic,setUserheadpic}
  return (
      <Provider value={headpic}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      </Provider>
  );
};

export default App;
