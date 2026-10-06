export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value || 0);

export const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const todayISO = () => new Date().toISOString().slice(0, 10);

// Turns an Axios error into a message a user can read
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.request) return 'Cannot reach the server. Is the backend running?';
  return error.message || 'Something went wrong';
};