import { h } from "preact";
import { useEffect } from "preact/hooks";
import "./PageHeader.scss";

function PageHeader({ children, action }) {
  useEffect(() => {
    document.title = `${children} - Qapper`;
  }, []);

  return (
    <header className="page-header">
      <h1 className="title">{children}</h1>

      {action}
    </header>
  );
}

export default PageHeader;
