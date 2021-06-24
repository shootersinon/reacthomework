import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';

import { useContext } from "react";
import { AppContext } from "../Context";

const Login = () => {
  const { users ,setUserheadpic} =
    useContext(AppContext);
  const navigate = useNavigate();
    

const logincheck=(value)=>{
  var account=true;
  for ( let i=0;i<users.length;i++ ){
  if (users[i].id==value.email){
    console.log("ok");
    account=false
    if(users[i].user_phone==value.password){
      console.log("yes");
      setUserheadpic({id:users[i].id,name:users[i].user_name,job:users[i].job,dept:users[i].dept})
      navigate('/app/dashboard', { replace: true });
    }
    else{
      window.alert("密碼錯誤");
      window.location.reload(false);
    }
  }
}
if (account){
  window.alert("帳號錯誤");
  window.location.reload(false);
}
}
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '2',
              password: '035-780050'
            }}
            
            onSubmit={(value) => {
              logincheck(value)
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="h2"
                  >
                    登入
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                  使用員工ID登入
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="員工ID"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                   登入
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
