import { h } from "preact";
import Icon from "./Icon";

function UserMenu() {
  return (
    <button className="flex items-center text-gray-800 ml-6">
      <Icon width="16" height="16" className="mr-2" icon="logout" />
      Logout
    </button>
  );
}

export default UserMenu;
