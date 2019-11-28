import { h, Component } from "preact";
import Button from "../components/Button";
import TestCaseContext from "../contexts/TestCaseContext";
import http from "../http";

class ActionItem extends Component {
  static contextType = TestCaseContext;

  handleRemove = () => {
    http
      .delete(`action-item/${this.props.item.id}`)
      .then(() =>
        this.context.removeItem(this.props.groupIndex, this.props.itemIndex)
      )
      .catch(() => {
        // this.context.setError(
        //   "Could not delete this item. Please try again later."
        // );
      });
  };

  handleEdit = evt => {
    http
      .patch(`action-item/${this.props.item.id}`, { name: evt.target.value })
      .then(item => {
        // TODO: don't set the entire item, because it contains some strange properties like actionGroup
        this.context.renameItem(
          this.props.groupIndex,
          this.props.itemIndex,
          item
        );
      })
      .catch(() => {
        // this.context.setError(
        //   "Could not update this item's name. Please try again later."
        // );
      });
  };

  render() {
    return (
      <div className="flex items-center mb-1">
        <input
          className="w-2/4 px-2 border border-solid border-gray-300 rounded-sm mr-2 text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          value={this.props.item.name}
          placeholder="Enter an action name"
          onBlur={this.handleEdit}
        />
        <input
          className="w-2/4 px-2 border border-solid border-gray-300 rounded-sm mr-2 text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          value={this.props.item.description}
          placeholder="Enter an action description"
        />
        <Button
          variant="danger"
          icon="trash"
          simple
          onClick={this.handleRemove}
        />
      </div>
    );
  }
}

export default ActionItem;
