import React from 'react';
import './Transactions.css';

const Transactions = ({ transactions }) => {
  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>
      <div className="transactions-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.type}</td>
                <td>{transaction.sender}</td>
                <td>{transaction.recipient || 'N/A'}</td>
                <td>₱{transaction.amount.toFixed(2)}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Transactions;
