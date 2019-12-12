import { h } from "preact";
import { PureComponent } from "preact/compat";
import Button from "../components/Button";
import TestCaseContext from "../contexts/TestCaseContext";
import withErrorDisplay from "../hocs/withErrorDisplay";
import http from "../http";

class ActionItem extends PureComponent {
  static contextType = TestCaseContext;

  state = {
    buttonDeleteLoading: false
  };

  handleRemove = () => {
    this.setState({ buttonDeleteLoading: true });

    http
      .delete(`action-item/${this.props.actionItem.id}`)
      .then(() =>
        this.context.removeActionItem(
          this.props.actionGroupIndex,
          this.props.actionItemIndex
        )
      )
      .catch(() => {
        this.props.displayError(
          "Could not delete this item. Please try again later."
        );

        this.setState({ buttonDeleteLoading: false });
      });
  };

  handleEdit = evt => {
    var { name, value } = evt.target;

    if (this.props.actionItem[name] != value) {
      http
        .patch(`action-item/${this.props.actionItem.id}`, { [name]: value })
        .then(item => {
          this.context.renameActionItem(
            this.props.actionGroupIndex,
            this.props.actionItemIndex,
            item
          );
        })
        .catch(() => {
          this.props.displayError(
            "Could not update this item's name. Please try again later."
          );
        });
    }
  };

  render() {
    return (
      <div className="flex items-center mb-1">
        <input
          className="w-2/4 px-2 border border-solid border-gray-300 rounded-sm mr-2 text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          value={this.props.actionItem.name}
          name="name"
          placeholder="Enter an action name"
          onBlur={this.handleEdit}
        />
        <input
          className="w-2/4 px-2 border border-solid border-gray-300 rounded-sm mr-2 text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          value={this.props.actionItem.description}
          name="description"
          placeholder="Enter an action description"
          onBlur={this.handleEdit}
        />
        <Button
          variant="danger"
          icon="trash"
          simple
          loading={this.state.buttonDeleteLoading}
          onClick={this.handleRemove}
        />
      </div>
    );
  }
}

export default withErrorDisplay(ActionItem);
