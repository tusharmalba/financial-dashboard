import { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext not available');
  const { login } = auth;
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // clear previous error

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
        email,
        password,
      });

      const token = res.data.token;
      if (token) {
        login(token); // ✅ store in AuthContext + localStorage
        console.log('🔐 Token saved:', token);
        login(res.data.token);
navigate('/');

        
      } 
      else {
        setError('No token returned from server');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      console.error('❌ Login error:', err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Avatar sx={{ m: '0 auto', bgcolor: 'primary.main' }}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" mt={1}>
          Sign In
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPwd(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth sx={{ mt: 2 }} variant="contained">
            Login
          </Button>
          <Typography variant="body2" mt={2}>
            Don't have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              sx={{ textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}
