import { h, Component, createRef } from "preact";

class InlineEditable extends Component {
  inputRef = createRef();

  componentDidUpdate() {
    if (this.props.editing) {
      this.inputRef.current.focus();
      this.inputRef.current.select();
    }
  }

  handleKeyDown = evt => {
    if (evt.key === "Enter") {
      this.props.onEnter(evt.target.value);
    } else if (evt.key === "Escape") {
      this.props.onEnter();
    }
  };

  handleBlur = evt => {
    this.props.onEnter(evt.target.value);
  };

  render() {
    if (this.props.editing) {
      return (
        <input
          type="text"
          className="border border-solid border-gray-300 text-gray-700 w-2/4 px-1 rounded-sm hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          placeholder={this.props.placeholder}
          value={this.props.children}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          ref={this.inputRef}
        />
      );
    }

    return <h3>{this.props.children}</h3>;
  }
}

export default InlineEditable;
