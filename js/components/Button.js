import { h } from "preact";

function Button({ children, type = "button" }) {
  return (
    <button
      className="text-white bg-blue-500 font-semibold text-sm px-3 py-2 rounded-sm hover:bg-blue-600"
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
