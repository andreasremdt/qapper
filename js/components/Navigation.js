import { h } from "preact";
import NavLink from "./NavLink";

function Navigation() {
  return (
    <nav className="border-b border-solid border-gray-300 bg-white">
      <div className="container mx-auto flex">
        <NavLink href="/" icon="Home">
          Dashboard
        </NavLink>
        <NavLink href="/testcases/create" icon="Folder">
          Create Testcase
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;
