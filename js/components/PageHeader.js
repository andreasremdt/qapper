import { h } from "preact";
import { useEffect } from "preact/hooks";

function PageHeader({ children, action }) {
  useEffect(() => {
    document.title = `${children} - Qapper`;
  }, []);

  return (
    <header className="mb-4 flex items-center justify-between">
      <h1 className="text-2xl">{children}</h1>

      {action}
    </header>
  );
}

export default PageHeader;
