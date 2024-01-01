import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../contexts/AuthContext';
import {
  getDocs,
  onSnapshot,
  collection,
  updateDoc,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import app, { auth, db } from "../firebase-config";


function AlertMessage(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://ivyherbals.com/">
        Ivy Herbals
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const mobileRef = useRef();
  const accessRef = useRef();

  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accesskey: "",
  });

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  // Access key
  async function checkAccessKeyInFirestore(accesskey) {
    const accessKeysCollection = collection(db, 'accessKey');
    const accessKeyQuery = query(accessKeysCollection, where('accesskey', '==', accesskey));

    const querySnapshot = await getDocs(accessKeyQuery);

    return !querySnapshot.empty;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const providedAccessKey = accessRef.current.value;

    try {
      if (!isCheckboxChecked) {
        throw new Error('Please agree to the terms and conditions');
      }

      // Check if the access key is present in Firestore
      const isAccessKeyValid = await checkAccessKeyInFirestore(providedAccessKey);

      if (isAccessKeyValid) {
        setError('');
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        setSignupSuccess(true);
      } else {
        throw new Error('Invalid access key');
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Use setTimeout to delay the redirect after signupSuccess becomes true
    if (signupSuccess) {
      const timeoutId = setTimeout(() => {
        setSignupSuccess(false); // Reset signupSuccess after redirect
        // UseNavigate hook to programmatically navigate to the login page
        navigate('/LogIn');
      }, 1000); // 1000 milliseconds (1 second)

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [signupSuccess, navigate]);

  const handleClose = () => {
    setError('');
    setSignupSuccess(false);
  };

  const handleLoginLink = () => {
    // Navigate to the login page
    navigate('/Login');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && (
            <AlertMessage
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </AlertMessage>
          )}
          {signupSuccess && (
            <AlertMessage
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Signup successful! You can now log in.
            </AlertMessage>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* ... other input fields ... */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  inputRef={emailRef}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  inputRef={passwordRef}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Re-password"
                  label="Confirm Password"
                  inputRef={passwordConfirmRef}
                  type="password"
                  id="Re-password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="mobile"
                  name="Mobile"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  inputRef={mobileRef}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="AccesKey"
                  label="Access Key"
                  inputRef={accessRef}
                  name="accesskey"
                  autoComplete="number"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" onChange={handleCheckboxChange} />}
                  label="I agree to the terms and conditions"
                />
                {showError && <Alert severity="error">Please agree to the terms and conditions</Alert>}
              </Grid>
            </Grid>
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleLoginLink}>
                  <Link to="/LogIn">Already have an account? Log in</Link>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
