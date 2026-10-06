import { useState } from 'react';
import StatusMessage from './StatusMessage';
import { todayISO } from '../utils/helpers';

// Full class names so Tailwind can find them
const buttonStyles = {
  income: 'bg-income hover:bg-teal-800 focus-visible:ring-income',
  expense: 'bg-expense hover:bg-rose-600 focus-visible:ring-expense',
};

// Props: type, categories, onSubmit(data) (async, throws on failure), buttonLabel
function TransactionForm({ type, categories, onSubmit, buttonLabel }) {
  const emptyForm = { title: '', amount: '', category: categories[0], date: todayISO() };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // One handler for every input, using the input's "name" attribute
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const found = {};
    if (!form.title.trim()) found.title = 'Enter a title';
    else if (form.title.trim().length > 60) found.title = 'Keep the title under 60 characters';
    if (!form.amount || Number(form.amount) <= 0) found.amount = 'Enter an amount greater than 0';
    if (!form.date) found.date = 'Pick a date';
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
      await onSubmit({ ...form, title: form.title.trim(), amount: Number(form.amount) });
      setForm(emptyForm); // clear the form after success
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (name) => `field ${errors[name] ? 'field-error' : ''}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor={`${type}-title`} className="mb-1 block text-sm font-semibold">Title</label>
        <input
          id={`${type}-title`}
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder={type === 'income' ? 'e.g. March stipend' : 'e.g. Lunch at canteen'}
          className={fieldClass('title')}
        />
        {errors.title && <p className="mt-1 text-xs text-expense">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor={`${type}-amount`} className="mb-1 block text-sm font-semibold">Amount (₹)</label>
        <input
          id={`${type}-amount`}
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          className={fieldClass('amount')}
        />
        {errors.amount && <p className="mt-1 text-xs text-expense">{errors.amount}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${type}-category`} className="mb-1 block text-sm font-semibold">Category</label>
          <select id={`${type}-category`} name="category" value={form.category} onChange={handleChange} className="field">
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${type}-date`} className="mb-1 block text-sm font-semibold">Date</label>
          <input
            id={`${type}-date`}
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={fieldClass('date')}
          />
          {errors.date && <p className="mt-1 text-xs text-expense">{errors.date}</p>}
        </div>
      </div>

      <StatusMessage type="error" message={serverError} />

      <button type="submit" disabled={submitting} className={`btn w-full ${buttonStyles[type]}`}>
        {submitting ? 'Saving...' : buttonLabel}
      </button>
    </form>
  );
}

export default TransactionForm;
