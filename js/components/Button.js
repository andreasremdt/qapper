import { h } from "preact";
import { Link } from "preact-router/match";
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
    case "success":
      return {
        default: simple ? "text-gray-600" : "text-white bg-green-400",
        hover: simple ? "hover:text-green-500" : "hover:bg-green-500"
      };
    default:
      return {
        default: simple ? "text-gray-600" : "text-yellow-900 bg-yellow-400",
        hover: simple ? "hover:text-yellow-700" : "hover:bg-yellow-300"
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
  ...props
}) {
  var colors = getColors(variant, simple);
  var ButtonTag = props.href ? Link : "button";

  return (
    <ButtonTag
      className={`${
        colors.default
      } font-semibold inline-flex items-center align-middle ${
        simple ? "" : "text-sm px-3 h-10"
      } rounded-sm ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : colors.hover
      } ${className}`}
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
    </ButtonTag>
  );
}

export default Button;
