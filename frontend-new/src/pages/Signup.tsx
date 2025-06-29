import { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export default function Signup() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPwd) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/signup`, {
        name,
        email,
        password,
      });
      if (auth) auth.login(res.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Avatar sx={{ m: '0 auto', bgcolor: 'primary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography variant="h5" mt={1}>Create Account</Typography>
        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            value={confirmPwd}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPwd(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth sx={{ mt: 2 }} variant="contained">Signup</Button>
        </form>
        <Typography variant="body2" mt={2}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">Login here</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
