import { h } from "preact";
import Icon from "./Icon";

function getColors(variant, simple) {
  switch (variant) {
    case "secondary":
      return {
        default: simple ? "text-gray-600" : "text-gray-700 bg-gray-300",
        hover: simple ? "text-gray-800" : "hover:bg-gray-400"
      };
    case "danger":
      return {
        default: simple ? "text-gray-600" : "text-white bg-red-500",
        hover: simple ? "hover:text-red-400" : "hover:bg-red-600"
      };
    case "warning":
      return {
        default: simple ? "text-gray-600" : "text-orange-700 bg-orange-300",
        hover: simple ? "hover:text-orange-700" : "hover:bg-orange-400"
      };
    case "success":
      return {
        default: simple ? "text-gray-600" : "text-white bg-green-400",
        hover: simple ? "hover:text-green-500" : "hover:bg-green-500"
      };
    default:
      return {
        default: simple ? "text-gray-600" : "text-white bg-blue-700",
        hover: simple ? "hover:text-blue-500" : "hover:bg-blue-600"
      };
  }
}

function Button({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  icon,
  loading,
  simple,
  className,
  type = "button",
  ...props
}) {
  var colors = getColors(variant, simple);

  return (
    <button
      className={`${
        colors.default
      } font-semibold inline-flex items-center align-middle ${
        simple ? "" : "text-sm px-3 py-2"
      } rounded-sm ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : colors.hover
      } ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {(icon || loading) && (
        <Icon
          width="18"
          height="18"
          icon={loading ? "refresh" : icon}
          className={`pointer-events-none ${simple ? "" : "mr-1"} ${
            loading ? "rotate" : ""
          }`}
        />
      )}
      {children}
    </button>
  );
}

export default Button;
