import { h } from "preact";
import symbols from "../../icons/symbol-defs.svg";

function Icon({ width = 24, height = 24, className, icon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden="true"
      className={className}
    >
      <use href={`${symbols}#${icon.toLowerCase()}`}></use>
    </svg>
  );
}

export default Icon;
