import { h, Fragment } from "preact";
import Label from "../primitives/Label";
import "./Input.scss";

function Input({ label, type = "text", multiline, ...props }) {
  return (
    <Fragment>
      {label && <Label htmlFor={props.id || props.name}>{label}</Label>}

      {multiline ? (
        <textarea className="form-control" {...props}></textarea>
      ) : (
        <input type={type} className="form-control" {...props} />
      )}
    </Fragment>
  );
}

export default Input;
