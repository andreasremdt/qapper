import { h } from "preact";

function ErrorMessage({ error, onClose }) {
  return (
    <div className="bg-red-500 text-white rounded-sm py-2 px-4 fixed top-0 right-0 m-4 max-w-sm leading-tight pr-10">
      <button
        type="button"
        onClick={onClose}
        className="text-red-800 absolute top-0 right-0 mt-2 mr-2"
      >
        <Icon icon="cross" width="20" height="20" />
      </button>
      <strong className="mb-2 block">Something went wrong :(</strong>
      <p>{error}</p>
    </div>
  );
}

export default ErrorMessage;
