import { h } from "preact";

function Header() {
  return (
    <header className="border-b border-solid border-gray-300 bg-white">
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-semibold">Qapper</h1>
      </div>
    </header>
  );
}

export default Header;
