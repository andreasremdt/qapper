import { h, Component } from "preact";
import ActionItem from "../components/ActionItem";
import Button from "../components/Button";
import InlineEditable from "../components/InlineEditable";
import TestCaseContext from "../contexts/TestCaseContext";
import http from "../http";

class ActionGroup extends Component {
  groupKey = `group.${this.props.group.id}.open`;

  state = {
    editing: false,
    buttonDeleteDisabled: false,
    buttonEditDisabled: false
  };

  static contextType = TestCaseContext;

  handleToggle = () => {
    var isOpen = localStorage.getItem(this.groupKey) == "true";

    localStorage.setItem(this.groupKey, isOpen ? "false" : "true");
  };

  handleRemove = () => {
    this.setState({ buttonDeleteDisabled: true });

    localStorage.removeItem(this.groupKey);

    http
      .delete(`action-group/${this.props.group.id}`)
      .then(() => this.context.removeGroup(this.props.index))
      .catch(() => {
        this.setState({ buttonDeleteDisabled: false });

        // this.context.setError(
        //   "Could not delete this group. Please try again later."
        // );
      });
  };

  handleItemAdd = () => {
    http
      .post("action-item", {
        name: "Untitled",
        actionGroupId: this.props.group.id
      })
      .then(item => this.context.addItem(this.props.index, item))
      .catch(() => {
        // this.context.setError(
        //   "Could not add a new group. Please try again later."
        // );
      });
  };

  handleEnterEdit = evt => {
    evt.stopPropagation();

    this.setState({ editing: true });
  };

  handleRename = name => {
    this.setState({ editing: false });

    if (name && name != this.props.group.name) {
      this.setState({ buttonEditDisabled: true });

      http
        .patch(`action-group/${this.props.group.id}`, { name })
        .then(() => this.context.renameGroup(this.props.index, name))
        .catch(() => {
          // this.context.setError(
          //   "Could not update this group's name. Please try again later."
          // );
        })
        .finally(() => {
          this.setState({ buttonEditDisabled: false });
        });
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
            onEnter={this.handleRename}
          >
            {this.props.group.name}
          </InlineEditable>

          <Button
            icon="edit"
            simple
            onClick={this.handleEnterEdit}
            loading={this.state.buttonEditDisabled}
            className="ml-auto mr-3"
          />
          <Button
            variant="danger"
            icon="trash"
            simple
            onClick={this.handleRemove}
            loading={this.state.buttonDeleteDisabled}
          />
        </summary>

        <div className="border border-solid border-gray-100 p-2">
          {this.props.group.actionItems.map((item, index) => (
            <ActionItem
              item={item}
              itemIndex={index}
              groupIndex={this.props.index}
              key={item.id}
            />
          ))}

          <Button onClick={this.handleItemAdd}>Add Item</Button>
        </div>
      </details>
    );
  }
}

export default ActionGroup;
