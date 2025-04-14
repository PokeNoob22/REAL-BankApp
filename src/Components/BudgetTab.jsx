import React, { useState, useEffect } from 'react';
import './BudgetTab.css';

const BudgetTab = ({ customers, setCustomers }) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [customerItems, setCustomerItems] = useState(() => {
    const saved = localStorage.getItem('customerItems');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('customerItems', JSON.stringify(customerItems));
  }, [customerItems]);

  const handleCustomerChange = (e) => {
    const id = parseInt(e.target.value);
    setSelectedCustomerId(id);
    const customer = customers.find(c => c.id === id);
    setSelectedCustomer(customer);
  };

  const handleAddItem = () => {
    if (!itemName || !itemPrice || !selectedCustomer) return;
    const price = parseFloat(itemPrice);
    if (isNaN(price) || price < 0) return;

    const updatedItems = [...(customerItems[selectedCustomer.id] || []), { name: itemName, price }];
    setCustomerItems(prev => ({ ...prev, [selectedCustomer.id]: updatedItems }));
    setItemName('');
    setItemPrice('');

    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomer.id) {
        return { ...customer, balance: customer.balance - price };
      }
      return customer;
    });
    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomers.find(c => c.id === selectedCustomer.id));
  };

  const handleDeleteItem = (index) => {
    const items = customerItems[selectedCustomer.id] || [];
    const removedItem = items[index];
    const updatedItems = items.filter((_, i) => i !== index);
    setCustomerItems(prev => ({ ...prev, [selectedCustomer.id]: updatedItems }));

    const updatedCustomers = customers.map(customer => {
      if (customer.id === selectedCustomer.id) {
        return { ...customer, balance: customer.balance + removedItem.price };
      }
      return customer;
    });
    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomers.find(c => c.id === selectedCustomer.id));
  };

  const items = customerItems[selectedCustomerId] || [];

  return (
    <div className="budget-container">
      <h2>Customer Budget</h2>
      <select onChange={handleCustomerChange} value={selectedCustomerId}>
        <option value="">Select a customer</option>
        {customers.map(customer => (
          <option key={customer.id} value={customer.id}>
            {customer.firstName} {customer.lastName}
          </option>
        ))}
      </select>

      {selectedCustomer && (
        <div className="budget-panel">
          <p>Balance: ${selectedCustomer.balance.toFixed(2)}</p>
          <div className="item-form">
            <input
              type="text"
              placeholder="Item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <button onClick={handleAddItem}>Add</button>
          </div>

          <ul className="item-list">
            {items.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
                <button onClick={() => handleDeleteItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BudgetTab;
