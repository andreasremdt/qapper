import { h } from "preact";
import Icon from "./Icon";

function UserMenu() {
  return (
    <button className="flex items-center text-blue-200 font-semibold ml-6 hover:text-white">
      <Icon width="16" height="16" className="mr-2" icon="logout" />
      Logout
    </button>
  );
}

export default UserMenu;
