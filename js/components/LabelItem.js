import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";
import Badge from "../primitives/Badge";
import IconButton from "../primitives/IconButton";
import LabelForm from "../components/LabelForm";
import http from "../http";
import withErrorDisplay from "../hocs/withErrorDisplay";
import "./LabelItem.scss";

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
      <article className="label-item">
        {this.state.isLabelFormShown ? (
          <LabelForm
            onSubmit={this.handleUpdate}
            onCancel={this.handleToggle}
            label={this.props.label}
          />
        ) : (
          <Fragment>
            <div className="label">
              <Badge color={this.props.label.color}>
                {this.props.label.name}
              </Badge>
            </div>

            {this.props.label.description && (
              <p className="description">{this.props.label.description}</p>
            )}

            <IconButton
              icon="edit"
              title="Edit this label"
              onClick={this.handleToggle}
            />

            <IconButton
              variant="danger"
              icon="trash"
              title="Delete this label"
              onClick={this.handleDelete}
              loading={this.state.buttonDeleteLoading}
            />
          </Fragment>
        )}
      </article>
    );
  }
}

export default withErrorDisplay(LabelItem);
