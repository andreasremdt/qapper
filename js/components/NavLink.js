import { h } from "preact";
import { Link } from "preact-router/match";
import Icon from "./Icon";

function NavLink({ href, children, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center text-blue-200 mr-6 font-semibold hover:text-yellow-300"
      activeClassName="text-yellow-300"
    >
      <Icon width="16" height="16" className="mr-2" icon={icon} />
      {children}
    </Link>
  );
}

export default NavLink;
