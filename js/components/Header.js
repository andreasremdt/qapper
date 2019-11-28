import { h } from "preact";
import Navigation from "./Navigation";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Icon from "./Icon";

function Header() {
  return (
    <header className="bg-header">
      <div className="container mx-auto py-3 flex items-center shadow">
        <Icon
          icon="logo"
          width="20"
          height="20"
          className="bg-white text-blue-800 p-1 content-box rounded-sm mr-8"
        />

        <Navigation />
        <Search />
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
