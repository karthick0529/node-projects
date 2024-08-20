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
import './Register.css';

const Register = () => {
  const user = useToken();
  const navigate = useNavigate();
  const [animation, setAnimation] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('First Name is required'),
      lastname: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
      setAnimation(true);
      try {
        const res = await http.post("/auth/sendRegisterMail", values);
        if (res.status === 200) {
          setAnimation(false);
          alert(`Account Verification link sent to your email - ${values.email}`);
          resetForm();
        }
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
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="Register_Form">
      <Box
        className="Register_Box"
        component="form"
        sx={{ m: 1, maxWidth: "300px" }}
        noValidate
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <Typography
          variant="body2"
          className="Register_header"
          sx={{
            textShadow: "-2px 0px 2px gray",
            fontWeight: "600",
            margin: "10px"
          }}
          gutterBottom
        >
          Provide valid credentials to Register account
        </Typography>
        <div>
          <TextField
            type="text"
            name="firstname"
            label="First Name"
            variant="outlined"
            sx={{ margin: "10px 2px", width: "85%" }}
            {...formik.getFieldProps('firstname')}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
          />
          <TextField
            type="text"
            name="lastname"
            label="Last Name"
            variant="outlined"
            sx={{ margin: "10px 2px", width: "85%" }}
            {...formik.getFieldProps('lastname')}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
          />
        </div>
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
        <Button
          variant="contained"
          sx={{ marginTop: "10px", marginBottom: "20px" }}
          type="submit"
          color="success"
          disabled={formik.isSubmitting}
        >
          {!animation ? "Sign Up" : <CircularProgress size={24} />}
        </Button>
      </Box>
    </div>
  );
};

export default Register;
