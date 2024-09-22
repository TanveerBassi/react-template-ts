import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("https://expenses-backend-mu.vercel.app/expenses", {
          headers: {
            "Content-Type": "application/json",
            "Username": "Tanveer.Bassi"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setExpenses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchExpenses();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Expenses List</h1>
      {expenses.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.merchant}</td>
                <td>${parseFloat(expense.amount).toFixed(2)}</td>
                <td>{capitalizeFirstLetter(expense.category)}</td>
                <td>{expense.description}</td>
                <td>{capitalizeFirstLetter(expense.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const capitalizeFirstLetter = (str) => {
  return str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
}


export default App;
