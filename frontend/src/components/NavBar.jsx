import { Link } from "react-router-dom";
import DarkToggle from "./DarkToggle";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-700 dark:text-white">
          📄 InvoiceBot
        </h1>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-blue-600 dark:text-blue-300 font-medium">
          <Link to="/">Home</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/history">History</Link>
          <DarkToggle />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-blue-700 dark:text-white text-xl"
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 items-start px-4 text-blue-700 dark:text-blue-200 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/compare" onClick={() => setMenuOpen(false)}>Compare</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>
          <DarkToggle />
        </div>
      )}
    </nav>
  );
}
