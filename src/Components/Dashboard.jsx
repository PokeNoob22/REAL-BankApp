import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ customers, transactions }) => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const total = customers.reduce((acc, customer) => acc + customer.balance, 0);
    setTotalBalance(total);
    setRecentTransactions(transactions.slice(0, 5));
  }, [customers, transactions]);

  return (
    <>
      <div className="dashboard-top-bar">
        <h2 className="dashboard-title">Dashboard</h2>
        <Button
          variant="contained"
          color="primary"
          className="add-customer-btn"
          onClick={() => navigate('/CreateUser')}
        >
          Add Customer
        </Button>
      </div>
      <p className="dashboard-subtitle">Welcome to your dashboard</p>

      {/* Main Container */}
      <div className="dashboard-container">
        {/* Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Balance</h3>
            <p>
              ₱{' '}
              {new Intl.NumberFormat('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(totalBalance)}
            </p>
          </div>
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p>{customers.length}</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="recent-transactions">
  <div className="recent-transactions-header">
    <h3>Recent Transactions</h3>
    <Button
      variant="text"
      className="view-all-btn"
      onClick={() => window.location.href = '/transactions'}
    >
      View All
    </Button>
  </div>

  {recentTransactions.length === 0 ? (
    <p className="no-transactions">No recent transactions available.</p>
  ) : (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {recentTransactions.map((transaction, index) => (
          <tr key={index}>
            <td className="transaction-type">{transaction.type}</td>
            <td>
              ₱{' '}
              {new Intl.NumberFormat('en-PH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(transaction.amount)}
            </td>
            <td>{transaction.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      </div>
    </>
  );
};

export default Dashboard;
