import React from 'react';
import './App.css';
import Button from'@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import {makeStyles, ThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import {green,orange} from '@material-ui/core/colors'
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import logo from './logo.svg';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';

const useStyles = makeStyles({
    root:{
        background:'linear-gradient(45deg,#333,#999)',
        border: 0,
        marginBottom:15,
        borderRadius:15,
        color:'white',
        padding:'0 30px'
    }
})

const theme=createMuiTheme({
    typography:{
        h2:{
            fontSize:36,
        }
    },
    palette:{
        primary:{
            main:green[500],
        },
        secondary:{
            main:orange[500],
        }
    }
})
function ButtonStyled(){
    const classes= useStyles();
    return <Button className={classes.root}>我是自帶樣式的按鈕</Button>
}


function CheckboxExample(){
    const [checked , setChecked] =React.useState(true)
    return(
        <FormControlLabel
            control={<Checkbox
            checked={checked}
            onChange={(e)=>setChecked(e.target.checked)}
            inputProps={{
                'aria-label' : 'secondary checkbox'
            }}
            />}
            label="Checkbox測試" 
        />
    )
}
function App(){
    return (
        <ThemeProvider theme={theme}>
                <div cassName="App">
                    <header className="App-header">
                        <AppBar color="primary">
                            <ToolBar>
                                <IconButton> 
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6">
                                        News
                                </Typography>
                                <Button color="secondary">
                                    Login
                                </Button>
                            </ToolBar>
                        </AppBar>
                        <Typography variant="h2" component="div">
                            歡迎來到 MUI
                        </Typography>
                        <Typography variant="subtitle1">
                            Material Ui
                        </Typography>
                        <TextField 
                            variant="outlined"
                            color="secondary"
                            label="test@test.com"
                            placeholder="test@test.com"   
                        />
                        <ButtonStyled />
                        <CheckboxExample />
                        <ButtonGroup variant="contained">
                            <Button
                                color="primary"
                                startIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                            <Button
                                color="secondary"
                                endIcon={<CloudUploadIcon />}
                                >
                                Upload
                            </Button>
                        </ButtonGroup>
                        <img src={logo} className="App-logo" alt="logo"/>              
                    </header>
                </div>
        </ThemeProvider> 
    )
}
export default App;
