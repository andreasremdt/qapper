import { h } from "preact";

function Search() {
  return (
    <form className="ml-auto">
      <input
        type="search"
        placeholder="Search..."
        className="rounded-full px-4 py-1 text-gray-600"
      />
    </form>
  );
}

export default Search;
