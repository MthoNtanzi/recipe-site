import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "../assets/styles/navbar.module.css";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>

        {/* Logo */}
        <NavLink to="/" className={styles.logo} onClick={handleNavClick}>
          Recipeasy
        </NavLink>

        {/* Desktop links */}
        <nav className={styles.links}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            Bookmarks
          </NavLink>
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <nav className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.active : ""}`
          }
          onClick={handleNavClick}
        >
          Home
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `${styles.mobileLink} ${isActive ? styles.active : ""}`
          }
          onClick={handleNavClick}
        >
          Bookmarks
        </NavLink>
      </nav>
    </header>
  );
}