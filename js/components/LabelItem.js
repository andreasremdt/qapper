import { h } from "preact";
import { PureComponent } from "preact/compat";
import Badge from "../components/Badge";
import Button from "../components/Button";
import LabelForm from "../components/LabelForm";
import http from "../http";
import withErrorDisplay from "../hocs/withErrorDisplay";

class LabelItem extends PureComponent {
  state = { buttonDeleteLoading: false, isLabelFormShown: false };

  handleDelete = () => {
    this.setState({ buttonDeleteLoading: true });

    http
      .delete(`label/${this.props.label.id}`)
      .then(() => this.props.onDelete(this.props.labelIndex))
      .catch(() =>
        this.props.displayError(
          "Could not delete label. Please try again later."
        )
      )
      .finally(() => this.setState({ buttonDeleteLoading: false }));
  };

  handleUpdate = label => {
    http
      .patch(`label/${this.props.label.id}`, label)
      .then(updated => this.props.onUpdate(updated, this.props.labelIndex))
      .catch(() =>
        this.props.displayError(
          "Could not update label. Please try again later."
        )
      )
      .finally(() => this.setState({ isLabelFormShown: false }));
  };

  handleToggle = () => {
    this.setState({ isLabelFormShown: !this.state.isLabelFormShown });
  };

  render() {
    return (
      <article className="p-3 border-solid border-b border-gray-200 hover:bg-gray-100">
        {this.state.isLabelFormShown ? (
          <LabelForm
            onSubmit={this.handleUpdate}
            onCancel={this.handleToggle}
            label={this.props.label}
          />
        ) : (
          <div className="flex justify-between items-center">
            <div className="w-64">
              <Badge color={this.props.label.color}>
                {this.props.label.name}
              </Badge>
            </div>

            <p>{this.props.label.description}</p>
            <Button
              icon="edit"
              simple
              title="Edit this label"
              className="ml-auto mr-3"
              onClick={this.handleToggle}
            />
            <Button
              variant="danger"
              icon="trash"
              simple
              title="Delete this label"
              onClick={this.handleDelete}
              loading={this.state.buttonDeleteLoading}
            />
          </div>
        )}
      </article>
    );
  }
}

export default withErrorDisplay(LabelItem);
