import { NavLink } from 'react-router-dom';

function Tabs() {
  return (
    <nav className="tabs">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `tab ${isActive ? 'tab-active' : ''}`}
      >
        home
      </NavLink>
      <NavLink
        to="/blog"
        className={({ isActive }) => `tab ${isActive ? 'tab-active' : ''}`}
      >
        blog
      </NavLink>
    </nav>
  );
}

export default Tabs;
