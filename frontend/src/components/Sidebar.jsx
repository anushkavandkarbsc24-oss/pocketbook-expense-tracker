import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Dashboard', icon: '▦', end: true },
  { to: '/income', label: 'Income', icon: '↓' },
  { to: '/expenses', label: 'Expenses', icon: '↑' },
];

// Props from the parent (Layout): open (is the mobile drawer visible), onClose
function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Dark overlay behind the drawer on small screens */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-ink-900 text-slate-200 transition-transform duration-200 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 py-6 text-xl font-extrabold tracking-tight text-white">Pocketbook</div>

        <nav className="flex-1 space-y-1 px-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? 'bg-ink-700 text-white' : 'text-slate-400 hover:bg-ink-800 hover:text-white'
                }`
              }
            >
              <span className="w-5 text-center text-base">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink-700 p-4">
          <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
          <p className="mb-3 truncate text-xs text-slate-400">{user?.email}</p>
          <button
            onClick={logout}
            className="w-full rounded-lg bg-ink-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-ink-800"
          >
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
