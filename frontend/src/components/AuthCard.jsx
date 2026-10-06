// Shared frame for the Login and Signup pages. `children` is the form.
function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <p className="text-sm font-extrabold text-income">Pocketbook</p>
        <h1 className="mt-1 text-2xl font-extrabold text-ink-900">{title}</h1>
        <p className="mb-6 mt-1 text-sm text-slate-500">{subtitle}</p>
        {children}
        <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>
      </div>
    </div>
  );
}

export default AuthCard;
