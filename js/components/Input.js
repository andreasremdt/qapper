import { h } from "preact";

function Input({ label, type = "text", multiline, ...props }) {
  return (
    <div className="mb-3">
      {label && (
        <label className="font-semibold block text-sm mb-1" htmlFor={props.id}>
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          className="border border-solid border-gray-300 px-3 w-full text-gray-700 py-2 rounded-sm hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          {...props}
        ></textarea>
      ) : (
        <input
          type={type}
          className="border border-solid border-gray-300 px-3 w-full text-gray-700 py-2 rounded-sm hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          {...props}
        />
      )}
    </div>
  );
}

export default Input;
