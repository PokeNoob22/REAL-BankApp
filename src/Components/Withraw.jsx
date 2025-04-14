import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button,TextField,MenuItem,Select,InputLabel,FormControl,
} from '@mui/material';
import './Withraw.css';
import { toast } from 'react-toastify';

const Withdraw = ({ customers, setCustomers, setTransactions }) => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const navigate = useNavigate();


  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    const customer = customers.find((c) => c.id === selectedCustomer);

    if (!selectedCustomer) {
      toast.error('Please select a customer');
      return;
    }

    if (!withdrawAmount || isNaN(amount) || amount <= 0) {
      toast.error('Withdraw amount should be greater than 0');
      return;
    }


    if (amount > customer.balance) {
      toast.error('Insufficient funds');
      return;
    }

    // Process withdrawal
    const updatedCustomers = customers.map((c) =>
      c.id === selectedCustomer
        ? { ...c, balance: c.balance - amount }
        : c
    );

    setCustomers(updatedCustomers);

    setTransactions((prev) => [
      ...prev,
      {
        type: 'Withdraw',
        sender: `${customer.firstName} ${customer.lastName}`,
        recipient: null,
        amount,
        date: new Date().toLocaleString(),
      },
    ]);

    setWithdrawAmount('');
    setSelectedCustomer('');
    toast.success('Withdrawal successful! 💸');
    navigate('/customers');
  };

  return (
    <div className="withraw-container">
      <h2>Withdraw Money</h2>
      <div className="withraw-form">
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
          label="Withdraw Amount"
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleWithdraw}>
          Withraw
        </Button>
      </div>
    </div>
  );
};

export default Withdraw;
