import { h } from "preact";
import "./Label.scss";

function Label({ children, htmlFor }) {
  return (
    <label className="form-label" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
