import { h } from "preact";
import { Link } from "preact-router/match";
import Icon from "../components/Icon";
import "./NavLink.scss";

function NavLink({ href, children, icon }) {
  return (
    <Link href={href} className="navigation-link" activeClassName="is-active">
      <Icon width="16" height="16" className="mr-2" icon={icon} />
      {children}
    </Link>
  );
}

export default NavLink;
