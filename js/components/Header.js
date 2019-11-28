import { h } from "preact";
import Navigation from "./Navigation";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Icon from "./Icon";

function Header() {
  return (
    <header className="bg-white border-b border-solid border-gray-300">
      <div className="container mx-auto py-3 flex items-center">
        <Icon
          icon="logo"
          width="20"
          height="20"
          className="bg-blue-500 text-white p-1 content-box rounded-sm mr-8"
        />

        <Navigation />
        <Search />
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
