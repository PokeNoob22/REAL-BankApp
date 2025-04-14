import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from './Components/SideNav';
import Dashboard from './Components/Dashboard';
import Customers from './Components/CustomerTab';
import Deposit from './Components/Deposit';
import Withraw from './Components/Withraw';
import SendMoney from './Components/SendMoney';
import DataTable from './Assets/DataTable';
import Transactions from './Components/Transactions';
import CreateUser from './Components/CreateUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BudgetTab from './Components/BudgetTab';

const App = () => {
  const [customers, setCustomers] = useState([
    { id: 1, firstName: 'Rose', lastName: 'Ann', email: 'roseann@email.com', age: 35, balance: 1500 },
    { id: 2, firstName: 'Ling', lastName: 'Dela Cruz', email: 'angela@email.com', age: 42, balance: 80000 },
    { id: 3, firstName: 'Helcurt', lastName: 'Reyes', email: 'helcurt@email.com', age: 45, balance: 300 },
    { id: 4, firstName: 'Change', lastName: 'Mendoza', email: 'change@email.com', age: 16, balance: 60000 },
    { id: 5, firstName: 'Hylos', lastName: 'Santos', email: 'hylos@email.com', age: null, balance: 400000 },
  ]);

const [transactions, setTransactions] = useState ([]);

  return (
    <Router>
      <div className="App" style={{ display: 'flex', backgroundColor: '#0d0d0d', maxHeight: '100vh' }}>
        <SideNav />
        <div style={{ flex: 1, padding: '20px'  }}>
        <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard customers={customers} transactions={transactions}/> } />
            <Route path="/customers" element={<Customers customers={customers} />} />
            <Route path="/deposit" element={<Deposit customers={customers} setCustomers={setCustomers} setTransactions={setTransactions} />} />
            <Route path="/withraw" element={<Withraw customers={customers} setCustomers={setCustomers} setTransactions={setTransactions} />} />
            <Route path="/sendmoney" element={<SendMoney customers={customers} setCustomers={setCustomers} setTransactions={setTransactions} />} />
            <Route path="transactions" element={<Transactions transactions={transactions}/>} />
            <Route path="/createuser" element={<CreateUser customers={customers} setCustomers={setCustomers} />} />
            <Route path="/datatables" element={<DataTable customers={customers} />} />
            <Route path="/budget" element={<BudgetTab customers={customers} setCustomers={setCustomers}/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
