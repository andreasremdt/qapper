import { h } from "preact";
import { Link } from "preact-router/match";
import Icon from "../components/Icon";
import "./Button.scss";

function Button({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  icon,
  isLoading,
  ...props
}) {
  var ButtonTag = props.href ? Link : "button";

  return (
    <ButtonTag
      className={`button is-${variant}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {(icon || isLoading) && (
        <Icon
          width="16"
          height="16"
          icon={isLoading ? "refresh" : icon}
          className={`icon ${isLoading ? "rotate" : ""}`}
        />
      )}
      {children}
    </ButtonTag>
  );
}

export default Button;
