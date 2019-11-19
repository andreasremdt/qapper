import { h } from "preact";
import { Link } from "preact-router/match";
import Icon from "./Icon";

function NavLink({ href, children, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center text-gray-600 py-4 mr-8 border-b border-solid border-transparent -mb-px hover:text-gray-700 hover:border-gray-800"
      activeClassName="border-blue-500 text-blue-500"
    >
      <Icon width="16" height="16" className="mr-2" icon={icon} />
      {children}
    </Link>
  );
}

export default NavLink;
