import { h } from "preact";
import "./Search.scss";

function Search() {
  return (
    <form className="search-form">
      <input type="search" placeholder="Search..." className="input" />
    </form>
  );
}

export default Search;
