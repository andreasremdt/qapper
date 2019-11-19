import { h, Component } from "preact";
import ActionItem from "../components/ActionItem";
import Icon from "../components/Icon";
import InlineEditable from "../components/InlineEditable";

const INITIAL_STATE = {
  editing: false
};

class ActionGroup extends Component {
  groupKey = `group.${this.props.group.id}.open`;

  state = INITIAL_STATE;

  handleToggle = () => {
    var isOpen = localStorage.getItem(this.groupKey) == "true";

    localStorage.setItem(this.groupKey, isOpen ? "false" : "true");
  };

  handleRemove = () => {
    localStorage.removeItem(this.groupKey);

    this.props.onRemove(this.props.group.id, this.props.index);
  };

  handleEnterEdit = evt => {
    evt.stopPropagation();

    this.setState({ editing: true });
  };

  handleLeaveEdit = newName => {
    this.setState({ editing: false });

    if (newName) {
      this.props.onRename(this.props.group.id, this.props.index, newName);
    }
  };

  get open() {
    return localStorage.getItem(this.groupKey) == "true";
  }

  render() {
    return (
      <details className="mb-2" open={this.open}>
        <summary
          className="bg-gray-100 hover:bg-gray-200 font-semibold p-2 cursor-pointer flex"
          onClick={this.handleToggle}
        >
          <InlineEditable
            editing={this.state.editing}
            onEnter={this.handleLeaveEdit}
          >
            {this.props.group.name}
          </InlineEditable>
          <button
            type="button"
            className="ml-auto mr-3 text-gray-600 hover:text-blue-500"
            onClick={this.handleEnterEdit}
          >
            <Icon
              className="pointer-events-none"
              width="18"
              height="18"
              icon="edit"
            />
          </button>
          <button
            type="button"
            className="text-gray-600 hover:text-red-400"
            onClick={this.handleRemove}
          >
            <Icon
              className="pointer-events-none"
              width="18"
              height="18"
              icon="trash"
            />
          </button>
        </summary>

        <div className="border border-solid border-gray-100 p-2">
          {this.props.group.actionItems.map(item => (
            <ActionItem
              name={item.name}
              description={item.description}
              key={item.id}
            />
          ))}
        </div>
      </details>
    );
  }
}

export default ActionGroup;
