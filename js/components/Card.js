import { h } from "preact";
import "./Card.scss";
import IconButton from "../primitives/IconButton";

function Card({ title, footer, children, dismissable, onDismiss, noSpacing }) {
  return (
    <section className="content-card">
      {title && (
        <header className="header">
          {typeof title === "string" ? <h3>{title}</h3> : title}

          {dismissable && (
            <IconButton
              icon="cross"
              className="close"
              aria-label="Dismiss"
              onClick={onDismiss}
            />
          )}
        </header>
      )}

      <div className={noSpacing ? "" : "body"}>{children}</div>

      {footer && <footer className="footer">{footer}</footer>}
    </section>
  );
}

export default Card;
