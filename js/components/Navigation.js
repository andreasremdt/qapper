import { h } from "preact";
import NavLink from "../primitives/NavLink";
import "./Navigation.scss";

function Navigation() {
  return (
    <nav className="main-navigation">
      <NavLink href="/" icon="home">
        Dashboard
      </NavLink>
      <NavLink href="/testcases/create" icon="new-folder">
        New testcase
      </NavLink>
      <NavLink href="/labels" icon="tag">
        Labels
      </NavLink>
    </nav>
  );
}

export default Navigation;
