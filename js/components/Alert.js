import { h } from "preact";
import Icon from "./Icon";

function getColor(type) {
  switch (type) {
    case "error":
      return "bg-red-100 text-red-600";
    case "success":
      return "bg-green-100 text-green-600";
    case "warning":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-blue-100 text-blue-600";
  }
}

function Alert({ children, loading, type }) {
  return (
    <div className={`${getColor(type)} rounded-sm p-2 flex items-center`}>
      {loading && (
        <Icon icon="refresh" width="16" height="16" className="mr-2 rotate" />
      )}
      {children}
    </div>
  );
}

export default Alert;
