
import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import logo from '../Assets/Images/logo.png';
import { FaHome, FaUsers, FaArrowDown, FaArrowUp, FaExchangeAlt, FaWallet, FaCogs, FaMoneyBillWave } from 'react-icons/fa';


const SideNav = () => {
  return (
    <div className="sidenav">
      <img src={logo} alt="logo" className="logo"/>
      <ul id="container">
        <li><Link to="/dashboard"><FaHome style={{ marginRight: '15px' }} />Dashboard</Link></li>
        <li><Link to="/customers"><FaUsers style={{ marginRight: '15px' }} />Customers</Link></li>
        <li><Link to="/withraw"><FaArrowDown style={{ marginRight: '15px' }} />Withraw</Link></li>
        <li><Link to="/deposit"><FaArrowUp style={{ marginRight: '15px' }} />Deposit</Link></li>
        <li><Link to="/sendmoney"><FaExchangeAlt style={{ marginRight: '15px' }} />Send Money</Link></li>
        <li><Link to="/transactions"><FaWallet style={{ marginRight: '15px' }} />Transactions</Link></li>
        <li><Link to="/createuser"><FaCogs style={{ marginRight: '15px' }} />Create User</Link></li>
        <li><Link to="/budget"><FaMoneyBillWave style={{ marginRight: '15px' }} />Budget</Link></li>
      </ul>
    </div>
  );
};

export default SideNav;
