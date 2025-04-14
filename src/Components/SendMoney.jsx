import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './SendMoney.css';
import { toast } from 'react-toastify';

const SendMoney = ({ customers, setCustomers, setTransactions }) => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSendMoney = () => {
    const amountToSend = parseFloat(amount);
    const senderCustomer = customers.find((c) => c.id === sender);
    const recipientCustomer = customers.find((c) => c.id === recipient);

    if (!sender || !recipient) {
      toast.error('Please fill out all fields');
      return;
    }

    if (sender === recipient) {
      toast.error("Sender can't send money to their own account");
      return;
    }

    if (!amount || isNaN(amountToSend) || amountToSend <= 0) {
      toast.error('Amount should be greater than 0');
      return;
    }

    if (amountToSend > senderCustomer.balance) {
      toast.error('Insufficient funds');
      return;
    }

    const updatedCustomers = customers.map((c) => {
      if (c.id === sender) {
        return { ...c, balance: c.balance - amountToSend };
      }
      if (c.id === recipient) {
        return { ...c, balance: c.balance + amountToSend };
      }
      return c;
    });

    setCustomers(updatedCustomers);

    setTransactions((prev) => [
      ...prev,
      {
        type: 'Send Money',
        sender: `${senderCustomer.firstName} ${senderCustomer.lastName}`,
        recipient: `${recipientCustomer.firstName} ${recipientCustomer.lastName}`,
        amount: amountToSend,
        date: new Date().toLocaleString(),
      },
    ]);

    setSender('');
    setRecipient('');
    setAmount('');
    setErrors({});
    toast.success('Money sent successfully!');
    navigate('/customers');
  };

  return (
    <div className="sendmoney-container">
      <h2>Send Money</h2>
      <div className="sendmoney-form">
        <FormControl fullWidth margin="normal" error={!!errors.sender}>
          <InputLabel>Sender</InputLabel>
          <Select
            value={sender}
            onChange={(e) => {
              setSender(e.target.value);
              setErrors({ ...errors, sender: '' });
            }}
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.recipient}>
          <InputLabel>Recipient</InputLabel>
          <Select
            value={recipient}
            onChange={(e) => {
              setRecipient(e.target.value);
              setErrors({ ...errors, recipient: '' });
            }}
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setErrors({ ...errors, amount: '' });
          }}
          fullWidth
          margin="normal"
          error={!!errors.amount}
          helperText={errors.amount}
        />

        <Button variant="contained" color="primary" onClick={handleSendMoney}>
          Send Money
        </Button>
      </div>
    </div>
  );
};

export default SendMoney;
