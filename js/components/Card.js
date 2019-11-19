import { h } from "preact";

function Card({ title, footer, children, dismissable, onDismiss }) {
  return (
    <article className="bg-white border border-solid border-gray-300 rounded-sm mb-4">
      {title && (
        <header className="border-b border-solid border-gray-300 px-4 py-3">
          {typeof title === "string" ? (
            <h3 className="text-lg">{title}</h3>
          ) : (
            title
          )}

          {dismissable && (
            <button
              type="button"
              className="close"
              arial-label="Dismiss"
              onClick={onDismiss}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"
                />
              </svg>
            </button>
          )}
        </header>
      )}

      <div className="px-4 py-3">{children}</div>

      {footer && <footer className="footer">{footer}</footer>}
    </article>
  );
}

export default Card;
