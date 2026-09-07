
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Search,Heart, ShoppingBag,LogIn,LogOut,Menu,X} from "lucide-react";

import { Logout } from "../Redux/Slice/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    setIsMenuOpen(false);
  };

  // Logout
  const handleLogout = () => {
    dispatch(Logout());
    navigate("/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-transparent px-5 py-5 md:px-10">

      {/* Main Navbar Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-semibold tracking-[0.25em] text-gray-900"
        >
          NEVORA
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-gray-800 transition hover:text-gray-500"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-gray-800 transition hover:text-gray-500"
          >
            Products
          </Link>

          <Link
            to="/categories"
            className="text-sm font-medium text-gray-800 transition hover:text-gray-500"
          >
            Categories
          </Link>

        </div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden items-center border-b border-gray-500 md:flex"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-44 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-500"
          />

          <button
            type="submit"
            className="p-2 text-gray-700 transition hover:text-gray-400"
            aria-label="Search"
          >
            <Search size={19} />
          </button>
        </form>

        {/* Wishlist + Cart */}
        <div className="hidden items-center gap-5 md:flex">

          <Link
            to="/wishlist"
            className="text-gray-800 transition hover:text-gray-500"
            aria-label="Wishlist"
          >
            <Heart size={21} />
          </Link>

          <Link
            to="/cart"
            className="text-gray-800 transition hover:text-gray-500"
            aria-label="Cart"
          >
            <ShoppingBag size={21} />
          </Link>

        </div>

        {/* Login / Logout */}
        <div className="hidden md:block">

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-gray-800 transition hover:text-gray-500"
            >
              <LogOut size={19} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium text-gray-800 transition hover:text-gray-500"
            >
              <LogIn size={19} />
              Login
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-800 md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Menu/// */}
      {isMenuOpen && (
        <div className="mt-5 border-t border-gray-300 pt-5 md:hidden">

          {/* Mobile Navigation */}
          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={closeMenu}
              className="text-sm font-medium text-gray-800"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="text-sm font-medium text-gray-800"
            >
              Products
            </Link>

            <Link
              to="/categories"
              onClick={closeMenu}
              className="text-sm font-medium text-gray-800"
            >
              Categories
            </Link>

          </div>

          {/* Mobile Search/// */}
          <form
            onSubmit={handleSearch}
            className="mt-5 flex items-center border-b border-gray-500"
          >

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-sm outline-none placeholder:text-gray-500"
            />

            <button
              type="submit"
              className="p-2 text-gray-700"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

          </form>



          {/* Mobile Actions/// */}


          <div className="mt-5 flex items-center gap-6">

            <Link
              to="/wishlist"
              onClick={closeMenu}
              className="text-gray-800"
              aria-label="Wishlist"
            >
              <Heart size={21} />
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="text-gray-800"
              aria-label="Cart"
            >
              <ShoppingBag size={21} />
            </Link>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-gray-800"
              >
                <LogOut size={19} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 text-sm font-medium text-gray-800"
              >
                <LogIn size={19} />
                Login
              </Link>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;