import { h } from "preact";
import Icon from "./Icon";
import "./ErrorMessage.scss";

function ErrorMessage({ error, onClose }) {
  return (
    <div className="error-message">
      <button type="button" onClick={onClose} className="close">
        <Icon icon="cross" width="20" height="20" />
      </button>
      <strong className="title">Something went wrong :(</strong>
      <p className="error">{error} lorem ipsum dolor set amet</p>
    </div>
  );
}

export default ErrorMessage;
