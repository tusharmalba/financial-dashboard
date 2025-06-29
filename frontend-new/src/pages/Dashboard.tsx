import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import {
  Typography,
  
  CircularProgress,
  
  Card,
  CardContent,
  Box,
  
  Toolbar,
  
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Link as RouterLink } from 'react-router-dom';

interface Transaction {
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

export default function Dashboard() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext is not available');
  const { token, logout } = auth;

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data.data)) {
          setTransactions(res.data.data);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const chartData = transactions.reduce((acc: any[], tx) => {
    const date = tx.date.split('T')[0];
    const existing = acc.find((item) => item.date === date);

    if (existing) {
      existing[tx.type] += tx.amount;
    } else {
      acc.push({
        date,
        income: tx.type === 'income' ? tx.amount : 0,
        expense: tx.type === 'expense' ? tx.amount : 0,
      });
    }
    return acc;
  }, []);

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const savings = totalIncome - totalExpense;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItemButton component={RouterLink} to="/">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/transactions">
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Transactions" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/profile">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          📊 Dashboard
        </Typography>

        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          <>
            <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
              <Card sx={{ flex: 1, backgroundColor: '#212121', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">Total Income</Typography>
                  <Typography variant="h5" color="#4caf50">
                    ₹{totalIncome}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ flex: 1, backgroundColor: '#212121', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">Total Expense</Typography>
                  <Typography variant="h5" color="#f44336">
                    ₹{totalExpense}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ flex: 1, backgroundColor: '#212121', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">Net Savings</Typography>
                  <Typography
                    variant="h5"
                    color={savings >= 0 ? '#4caf50' : '#f44336'}
                  >
                    ₹{savings}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Typography mt={2} color="white">
              Total transactions loaded: {transactions.length}
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#4caf50"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#f44336"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </Box>
    </Box>
  );
}
