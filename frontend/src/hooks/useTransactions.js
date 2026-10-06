import { useEffect, useState } from 'react';
import api from '../api/axios';
import { getErrorMessage } from '../utils/helpers';

// Custom hook: loads, adds and deletes items for an endpoint
// ('/income' or '/expenses'). Used by both the Income and Expenses pages.
export default function useTransactions(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true; // ignore the response if the component unmounted
    setLoading(true);
    api
      .get(endpoint)
      .then((res) => {
        if (active) {
          setItems(res.data);
          setError('');
        }
      })
      .catch((err) => active && setError(getErrorMessage(err)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [endpoint]);

  // These throw on failure so the caller (form / page) can show the message
  const addItem = async (data) => {
    try {
      const res = await api.post(endpoint, data);
      setItems((prev) => [res.data, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  };

  return { items, loading, error, addItem, removeItem };
}
