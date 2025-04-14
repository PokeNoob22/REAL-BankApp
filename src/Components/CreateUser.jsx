import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import './CreateUser.css';
import { toast } from 'react-toastify';

const CreateUser = ({ customers, setCustomers }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [balance, setBalance] = useState('');
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCreateUser = () => {


    if(!firstName || !lastName || !email || !age || !balance){
      toast.error('All fields are required')
      return;
    }

    if(isNaN(age) || age < 12){
      toast.error('Client must be 12 years old and above')
      return;
    }

    if(isNaN(balance) || balance < 100){
      toast.error('Minimum Initial Balance is 100')
      return;
    }

    if (!emailRegex.test(email)) {
    toast.error('Please enter a valid email address');
    return;
    }

    if (firstName && lastName && email && age && balance) {
      const newUser = {
        id: customers.length + 1, //can be any logic to generate an ID
        firstName,
        lastName,
        email,
        age: parseInt(age),
        balance: parseFloat(balance),
      };

      setCustomers([...customers, newUser]);
      toast.success('User created successfully!');
      navigate('/customers');
    }
  };

  return (
    <div className="create-user-container">
      <h2>Create New User</h2>
      <div className="create-user-form">
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          Create User
        </Button>
      </div>
    </div>
  );
};

export default CreateUser;
