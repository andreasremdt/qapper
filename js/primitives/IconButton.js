import { h } from "preact";
import { Link } from "preact-router/match";
import Icon from "../components/Icon";
import "./IconButton.scss";

function Button({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  icon,
  isLoading,
  className,
  ...props
}) {
  var ButtonTag = props.href ? Link : "button";

  return (
    <ButtonTag
      className={`icon-button is-${variant} ${className ? className : ""}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {(icon || isLoading) && (
        <Icon
          width="18"
          height="18"
          icon={isLoading ? "refresh" : icon}
          className={`icon ${isLoading ? "rotate" : ""}`}
        />
      )}
    </ButtonTag>
  );
}

export default Button;
