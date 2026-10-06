import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// Shell for all private pages. <Outlet /> is where the current page appears.
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer state

  return (
    <div className="min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:pl-64">
        {/* Top bar only shows on small screens */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-lg leading-none"
            aria-label="Open menu"
          >
            ☰
          </button>
          <span className="font-extrabold">Pocketbook</span>
        </header>

        <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
