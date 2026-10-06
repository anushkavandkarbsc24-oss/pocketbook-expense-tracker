import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-4 text-center">
      <h1 className="text-3xl font-extrabold text-ink-900">Page not found</h1>
      <p className="text-slate-500">The page you opened does not exist.</p>
      <Link to="/" className="btn bg-ink-900 hover:bg-ink-700">Go to dashboard</Link>
    </div>
  );
}

export default NotFound;
