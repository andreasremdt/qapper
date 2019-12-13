import { h } from "preact";
import Icon from "./Icon";

function Badge({ children, color, className, onDelete }) {
  return (
    <span
      className={`bg-gray-600 ${
        onDelete ? "flex items-center" : ""
      } font-semibold text-sm text-white px-2 py-1 rounded-sm mr-1 inline-block lowercase whitespace-no-wrap ${className}`}
      style={{ backgroundColor: color }}
    >
      {children}

      {onDelete && (
        <button
          className="ml-2 text-white"
          title="Remove label"
          onMouseUp={onDelete}
        >
          <Icon width="16" height="16" icon="cross" />
        </button>
      )}
    </span>
  );
}

export default Badge;
