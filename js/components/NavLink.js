import { h } from "preact";
import { Link } from "preact-router/match";
import Icon from "./Icon";

function NavLink({ href, children, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center text-gray-800 mr-6"
      activeClassName="text-blue-500"
    >
      <Icon width="16" height="16" className="mr-2" icon={icon} />
      {children}
    </Link>
  );
}

export default NavLink;
