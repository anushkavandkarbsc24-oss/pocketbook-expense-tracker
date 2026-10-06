import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';
import StatusMessage from '../components/StatusMessage';
import { getErrorMessage } from '../utils/helpers';

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />; // already logged in

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password) {
      setError('Enter your email and password');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await login(form.email.trim(), form.password);
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to see your balance and recent activity."
      footer={<>New here? <Link to="/signup" className="font-semibold text-income hover:underline">Create an account</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="field" placeholder="you@college.edu" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} className="field" placeholder="Your password" />
        </div>
        <StatusMessage type="error" message={error} />
        <button type="submit" disabled={submitting} className="btn w-full bg-ink-900 hover:bg-ink-700 focus-visible:ring-ink-900">
          {submitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </AuthCard>
  );
}

export default Login;
