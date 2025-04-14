import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import './Deposit.css';
import { toast } from 'react-toastify';

const Deposit = ({ customers, setCustomers, setTransactions }) => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const navigate = useNavigate();

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    const customer = customers.find((c) => c.id === selectedCustomer);

    if (!selectedCustomer) {
      toast.error('Please select a customer');
      return;
    }

    if (!depositAmount || isNaN(amount) || amount <= 0) {
      toast.error('Deposit amount should be greater than 0');
      return;
    }

    const updatedCustomers = customers.map((c) =>
      c.id === selectedCustomer ? { ...c, balance: c.balance + amount } : c
    );

    setCustomers(updatedCustomers);

    setTransactions((prev) => [
      ...prev,
      {
        type: 'Deposit',
        sender: null,
        recipient: `${customer.firstName} ${customer.lastName}`,
        amount,
        date: new Date().toLocaleString(),
      },
    ]);

    setDepositAmount('');
    setSelectedCustomer('');
    toast.success('Deposit successful! 💰');
    navigate('/customers');
  };

  return (
    <div className="deposit-container">
      <h2>Deposit Money</h2>
      <div className="deposit-form">
        <FormControl fullWidth margin="normal">
          <InputLabel>Customer</InputLabel>
          <Select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Deposit Amount"
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleDeposit}>
          Deposit
        </Button>
      </div>
    </div>
  );
};

export default Deposit;
