import { h } from "preact";
import "./FormGroup.scss";

function FormGroup({ children, className = "", direction = "bottom" }) {
  return (
    <div className={`form-group has-${direction} ${className}`}>{children}</div>
  );
}

export default FormGroup;
