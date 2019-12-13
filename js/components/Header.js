import { h } from "preact";
import Navigation from "./Navigation";
import Search from "./Search";
import NavLink from "../primitives/NavLink";
import Icon from "./Icon";
import "./Header.scss";

function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <Icon icon="logo" width="20" height="20" className="icon" />

        <Navigation />
        <Search />
        <NavLink href="/logout" icon="logout">
          Logout
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
