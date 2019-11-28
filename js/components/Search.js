import { h } from "preact";

function Search() {
  return (
    <form className="ml-auto">
      <input
        type="search"
        placeholder="Search..."
        className="border border-solid border-gray-300 rounded-full px-4 py-1 text-gray-600 hover:border-gray-400 focus:border-blue-400 focus:shadow-outline"
      />
    </form>
  );
}

export default Search;
