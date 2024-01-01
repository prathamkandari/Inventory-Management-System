import React, { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import backgroundImage from '../imgs/ivy-logo-removebg-preview.png';
import bg2 from '../imgs/3.jpg';
import bg3 from '../imgs/4.jpg';

export default function LogIn() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login, logout, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setLoginSuccess(true);
            // Navigate to the inventory page on successful login
            navigate('/dashboard');
        } catch {
            setError('Failed to sign in');
        }
        setLoading(false);
    }

    const handleClose = () => {
        setError('');
        setLoginSuccess(false);
    };

    // async function handleLogout() {
    //     try {
    //         await logout();
    //         // Clear localStorage on logout
    //         localStorage.removeItem("currentUser");
    //     } catch (error) {
    //         console.error("Logout failed:", error.message);
    //     }
    // }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* <div
                style={{ flex: 1, background: `url(${backgroundImage}) center `, width: '125vh', height: '1000vh', backgroundRepeat: 'no-repeat' }}
            /> */}
            <div style={{ display: 'flex', flex: 1, height: '50vh' }}>
                <div
                    style={{ flex: 1, background: `url(${bg2}) center `, width: '50vh', height: '50vh', justifyContent: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                />
                <div
                    style={{ flex: 1, background: `url(${bg3}) center `, width: '50vh', justifyContent: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: "40px"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
                    {error && (
                        <Alert
                            severity="error"
                            sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
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
                        </Alert>
                    )}
                    {loginSuccess && (
                        <Alert
                            severity="success"
                            sx={{ marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
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
                            Login successful! You are now logged in.
                        </Alert>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={emailRef}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        inputRef={passwordRef}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        color="success"
                        style={{ marginTop: 10, marginBottom: 2 }}
                    >
                        Log In
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "15px" }}>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        <Link variant="body2">
                            {/* <Link to="/Signup">Don't have an account? Sign Up</Link> */}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
