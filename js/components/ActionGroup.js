import { h } from "preact";
import { PureComponent } from "preact/compat";
import ActionItem from "../components/ActionItem";
import Button from "../primitives/Button";
import InlineEditable from "../components/InlineEditable";
import TestCaseContext from "../contexts/TestCaseContext";
import withErrorDisplay from "../hocs/withErrorDisplay";
import http from "../http";

class ActionGroup extends PureComponent {
  static contextType = TestCaseContext;

  state = {
    editing: false,
    buttonDeleteLoading: false,
    buttonEditLoading: false,
    buttonAddItemLoading: false
  };

  handleToggle = () => {
    var isOpen = localStorage.getItem(this.groupKey) == "true";

    localStorage.setItem(this.groupKey, isOpen ? "false" : "true");
  };

  handleRemove = () => {
    this.setState({ buttonDeleteLoading: true });

    http
      .delete(`action-group/${this.props.actionGroup.id}`)
      .then(() => {
        this.context.removeActionGroup(this.props.index);
        localStorage.removeItem(this.groupKey);
      })
      .catch(() => {
        this.setState({ buttonDeleteLoading: false });

        this.props.displayError(
          "Could not delete this group. Please try again later."
        );
      });
  };

  handleItemAdd = evt => {
    evt.stopPropagation();

    this.setState({ buttonAddItemLoading: true });

    http
      .post("action-item", {
        name: "Untitled",
        actionGroupId: this.props.actionGroup.id
      })
      .then(item => this.context.addActionItem(this.props.index, item))
      .catch(() =>
        this.props.displayError(
          "Could not add a new group. Please try again later."
        )
      )
      .finally(() => this.setState({ buttonAddItemLoading: false }));
  };

  handleToggleEditing = evt => {
    evt.stopPropagation();

    this.setState(prevState => ({ editing: !prevState.editing }));
  };

  handleRename = name => {
    if (name && name != this.props.actionGroup.name) {
      this.setState({ buttonEditLoading: true });

      http
        .patch(`action-group/${this.props.actionGroup.id}`, { name })
        .then(() => this.context.renameActionGroup(this.props.index, name))
        .catch(() =>
          this.props.displayError(
            "Could not update this group's name. Please try again later."
          )
        )
        .finally(() => {
          this.setState({ buttonEditLoading: false, editing: false });
        });
    }
  };

  get open() {
    return localStorage.getItem(this.groupKey) == "true";
  }

  get groupKey() {
    return `group.${this.props.actionGroup.id}.open`;
  }

  render() {
    var { actionGroup } = this.props;

    return (
      <details className="mb-2" open={this.open}>
        <summary
          className="bg-gray-100 hover:bg-gray-200 font-semibold p-2 cursor-pointer flex rounded-t-sm"
          onClick={this.handleToggle}
        >
          <InlineEditable
            editing={this.state.editing}
            onEnter={this.handleRename}
          >
            {actionGroup.name}
          </InlineEditable>

          <Button
            icon="plus"
            simple
            className="ml-auto mr-3"
            title="Add new action item"
            onClick={this.handleItemAdd}
            loading={this.state.buttonAddItemLoading}
          />
          <Button
            icon="edit"
            simple
            onClick={this.handleToggleEditing}
            title="Edit group's name"
            loading={this.state.buttonEditLoading}
            className="mr-3"
          />
          <Button
            variant="danger"
            icon="trash"
            simple
            onClick={this.handleRemove}
            title="Remove this group"
            loading={this.state.buttonDeleteLoading}
          />
        </summary>

        <div className="border border-solid border-gray-100 p-2">
          {actionGroup.actionItems.length ? (
            actionGroup.actionItems.map((actionItem, index) => (
              <ActionItem
                actionItem={actionItem}
                actionItemIndex={index}
                actionGroupIndex={this.props.index}
                key={actionItem.id}
              />
            ))
          ) : (
            <p>There no items yet.</p>
          )}
        </div>
      </details>
    );
  }
}

export default withErrorDisplay(ActionGroup);
