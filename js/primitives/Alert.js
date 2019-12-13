import { h } from "preact";
import Icon from "../components/Icon";
import "./Alert.scss";

function Alert({ children, isLoading, variant = "primary" }) {
  return (
    <div className={`alert is-${variant}`}>
      {isLoading && (
        <Icon icon="refresh" width="16" height="16" className="icon rotate" />
      )}

      {children}
    </div>
  );
}

export default Alert;
