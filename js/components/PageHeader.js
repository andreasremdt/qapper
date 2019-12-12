import { h } from "preact";
import { useEffect } from "preact/hooks";

function PageHeader({ children }) {
  useEffect(() => {
    document.title = `${children} - Qapper`;
  }, []);

  return (
    <header className="mb-4">
      <h1 className="text-2xl">{children}</h1>
    </header>
  );
}

export default PageHeader;
