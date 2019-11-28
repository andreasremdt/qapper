import { h } from "preact";
import NavLink from "./NavLink";

function Navigation() {
  return (
    <nav className="border-b border-solid border-gray-300 bg-white">
      <div className="container mx-auto flex">
        <NavLink href="/" icon="home">
          Dashboard
        </NavLink>
        <NavLink href="/testcases/create" icon="new-folder">
          Create Testcase
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
