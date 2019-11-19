import { h } from "preact";

function Button({ children, onClick, disabled, type = "button" }) {
  return (
    <button
      className={`text-white bg-blue-500 font-semibold text-sm px-3 py-2 rounded-sm ${
        disabled
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:bg-blue-600"
      }`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
