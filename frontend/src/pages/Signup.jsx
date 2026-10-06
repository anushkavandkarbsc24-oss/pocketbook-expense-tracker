import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthCard from '../components/AuthCard';
import StatusMessage from '../components/StatusMessage';
import { getErrorMessage } from '../utils/helpers';

function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const found = {};
    if (!form.name.trim()) found.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Enter a valid email address';
    if (form.password.length < 6) found.password = 'Use at least 6 characters';
    if (form.confirm !== form.password) found.confirm = 'Passwords do not match';
    return found;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setServerError('');
    try {
      await signup(form.name.trim(), form.email.trim(), form.password);
      navigate('/');
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (name) => `field ${errors[name] ? 'field-error' : ''}`;

  const inputs = [
    { name: 'name', label: 'Full name', type: 'text', placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@college.edu' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'At least 6 characters' },
    { name: 'confirm', label: 'Confirm password', type: 'password', placeholder: 'Repeat the password' },
  ];

  return (
    <AuthCard
      title="Create your account"
      subtitle="Track income and spending in one place."
      footer={<>Already registered? <Link to="/login" className="font-semibold text-income hover:underline">Log in</Link></>}
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {inputs.map((input) => (
          <div key={input.name}>
            <label htmlFor={input.name} className="mb-1 block text-sm font-semibold">{input.label}</label>
            <input
              id={input.name}
              name={input.name}
              type={input.type}
              value={form[input.name]}
              onChange={handleChange}
              placeholder={input.placeholder}
              className={fieldClass(input.name)}
            />
            {errors[input.name] && <p className="mt-1 text-xs text-expense">{errors[input.name]}</p>}
          </div>
        ))}
        <StatusMessage type="error" message={serverError} />
        <button type="submit" disabled={submitting} className="btn w-full bg-ink-900 hover:bg-ink-700 focus-visible:ring-ink-900">
          {submitting ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
    </AuthCard>
  );
}

export default Signup;
