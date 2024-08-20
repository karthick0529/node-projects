import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useToken } from '../../TokenContext/TokenProvider';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import http from '../../../utils/http';
import './Login.css';

const Login = () => {
  let navigate = useNavigate();
  const user = useToken();
  const [animation, setAnimation] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setAnimation(true);
      try {
        const { data } = await http.post("/auth/login", values);
        localStorage.setItem("token", data.token);
        window.location = "/";
      } catch (err) {
        setAnimation(false);
        setSubmitting(false);
        if (err.message === "Network Error") {
          setFieldError('email', "Connection timeout! / DB not responding");
        } else if (err.response && err.response.status === 400) {
          setFieldError('email', err.response.data);
        } else {
          setFieldError('email', err.message);
        }
      }
    }
  });

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="Login_Form">
      <Box
        className="Login_Box"
        component="form"
        sx={{ m: 1, maxWidth: "360px" }}
        noValidate
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <Typography
          variant="body2"
          className="Login_header"
          sx={{
            textShadow: "-2px 0px 2px gray",
            fontWeight: "600",
            margin: "10px"
          }}
          gutterBottom
        >
          Provide valid credentials to login
        </Typography>

        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          sx={{ margin: "10px 2px", width: "85%" }}
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          sx={{ margin: "10px 2px", width: "85%" }}
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button size="medium" className='Login_Forgot' onClick={() => navigate('/password-reset')}>Forgot Password?</Button>
        <Button
          variant="contained"
          sx={{ marginTop: "10px", marginBottom: "20px" }}
          type="submit"
          color="success"
          disabled={formik.isSubmitting}
        >
          {!animation ? "Login" : <CircularProgress size={24} />}
        </Button>
      </Box>
    </div>
  );
};

export default Login;
