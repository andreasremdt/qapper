import { h } from "preact";
import Icon from "../components/Icon";
import "./Badge.scss";

function Badge({ children, color, className, onDelete }) {
  return (
    <span className="badge" style={{ backgroundColor: color }}>
      {children}

      {onDelete && (
        <button className="action" title="Remove label" onMouseUp={onDelete}>
          <Icon width="16" height="16" icon="cross" />
        </button>
      )}
    </span>
  );
}

export default Badge;
