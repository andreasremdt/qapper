import { h } from "preact";
import NavLink from "./NavLink";

function Navigation() {
  return (
    <nav className="flex">
      <NavLink href="/" icon="home">
        Dashboard
      </NavLink>
      <NavLink href="/testcases/create" icon="new-folder">
        Create Testcase
      </NavLink>
    </nav>
  );
}

export default Navigation;
