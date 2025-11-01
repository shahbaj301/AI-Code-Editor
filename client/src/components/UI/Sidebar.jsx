import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="bg-gray-900 p-4 rounded-lg shadow-lg w-48 space-y-3 flex flex-col">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `block px-3 py-2 rounded hover:bg-cyan-600 transition-colors duration-200 ${
            isActive ? 'bg-cyan-700 text-white' : 'text-gray-300'
          }`
        }
      >
        🏠 Dashboard
      </NavLink>
      <NavLink
        to="/editor"
        className={({ isActive }) =>
          `block px-3 py-2 rounded hover:bg-cyan-600 transition-colors duration-200 ${
            isActive ? 'bg-cyan-700 text-white' : 'text-gray-300'
          }`
        }
      >
        📝 New Code
      </NavLink>
      <NavLink
        to="/codes"
        className={({ isActive }) =>
          `block px-3 py-2 rounded hover:bg-cyan-600 transition-colors duration-200 ${
            isActive ? 'bg-cyan-700 text-white' : 'text-gray-300'
          }`
        }
      >
        📂 My Snippets
      </NavLink>
    </aside>
  );
}
