import { useContext, useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

interface Transaction {
  _id: string;
  date: string;
  amount: number;
  category: string;
  type: string;
  status: string;
  description: string;
  user: string;
}

export default function Transactions() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthContext not available');
  const { token } = auth;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            q: search,
            category,
            status,
            limit: 50,
            page: 1,
          },
        });

        setTransactions(res.data.data);
      } catch (err) {
        console.error('Failed to fetch transactions', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, category, status, token]);

//   const handleExport = async () => {
//     try {

//         const res = await axios.post(`${process.env.REACT_APP_API}/export`, {}, {
//   headers: { Authorization: `Bearer ${token}` },
//   responseType: 'blob',
// });
      

//       const blob = new Blob([res.data], { type: 'text/csv' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'transactions.csv';
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('❌ Export failed:', err);
//       alert('Export failed. Check console for details.');
//     }
//   };

const handleExport = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/export`,
      {
        fields: ['date', 'amount', 'category', 'type', 'status', 'description'],
filters: {} // ← no filters at all
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      }
    );

    const blob = new Blob([res.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('❌ Export failed:', err);
    alert('Export failed. Check console for details.');
  }
};


  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'user', headerName: 'User', width: 120 },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        💼 Transactions
      </Typography>

      {/* 🔽 Filter + Export Section */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField
          label="Search Description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Salary">Salary</MenuItem>
          <MenuItem value="Groceries">Groceries</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
        </TextField>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="cleared">Cleared</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </TextField>

        {/* ✅ CSV Export Button */}
        <Button
          variant="contained"
          color="success"
          onClick={handleExport}
        >
          ⬇️ Export CSV
        </Button>
      </Box>

      {/* 🧾 Data Table */}
      <DataGrid
        rows={transactions}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        autoHeight
        paginationModel={{ pageSize: 10, page: 0 }}
        pageSizeOptions={[10]}
      />
    </Container>
  );
}
