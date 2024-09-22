import { useState, useEffect } from 'react';

interface Expense {
  date: string;
  merchant: string;
  amount: number;
  category: string;
  description: string;
  status: string;
}

interface AppProps {}

const App = ({}: AppProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("https://expenses-backend-mu.vercel.app/expenses", {
          headers: {
            "Content-Type": "application/json",
            "Username": "firstname.lastname"
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

  const capitalizeFirstLetter = (str: string): string => {
    return str && str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  };

  return (
    <div>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Expenses List</h1>
      {expenses.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</p>
      ) : (
        <table style={{
          borderCollapse: 'collapse',
          width: '100%',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Merchant</th>
              <th style={{ padding: '16px', textAlign: 'right' }}>Amount</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '16px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '16px', textAlign: 'left' }}>{new Date(expense.date).toLocaleDateString()}</td>
                <td style={{ padding: '16px', textAlign: 'left' }}>{expense.merchant}</td>
                <td style={{ padding: '16px', textAlign: 'right' }}>${parseFloat(expense.amount).toFixed(2)}</td>
                <td style={{ padding: '16px', textAlign: 'left' }}>{capitalizeFirstLetter(expense.category)}</td>
                <td style={{ padding: '16px', textAlign: 'left' }}>{expense.description}</td>
                <td style={{ padding: '16px', textAlign: 'center' }}>{capitalizeFirstLetter(expense.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
