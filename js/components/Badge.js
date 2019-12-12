import { h } from "preact";

function Badge({ children, color, className }) {
  return (
    <span
      className={`bg-gray-600 font-semibold text-sm text-white px-2 py-1 rounded-sm mr-1 inline-block lowercase ${className}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

export default Badge;
