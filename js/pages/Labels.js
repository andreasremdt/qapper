import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";
import update from "immutability-helper";
import PageHeader from "../primitives/PageHeader";
import Card from "../components/Card";
import Alert from "../primitives/Alert";
import Button from "../primitives/Button";
import http from "../http";
import withErrorDisplay from "../hocs/withErrorDisplay";
import LabelItem from "../components/LabelItem";
import LabelForm from "../components/LabelForm";

class Labels extends PureComponent {
  state = {
    isLoading: true,
    isCreateSectionShown: false,
    labels: []
  };

  componentDidMount() {
    http
      .get("label")
      .then(labels => this.setState({ labels, isLoading: false }))
      .catch(() =>
        this.props.displayError(
          "Could not fetch the labels. Please try again later."
        )
      );
  }

  handleToggle = () => {
    this.setState({ isCreateSectionShown: !this.state.isCreateSectionShown });
  };

  handleCreateLabel = label => {
    http
      .post("label", label)
      .then(created => {
        this.setState(prevState =>
          update(prevState, {
            labels: { $push: [created] },
            isCreateSectionShown: { $set: false }
          })
        );
      })
      .catch(() =>
        this.props.displayError(
          "Could not create the label. Please try again later."
        )
      );
  };

  handleDeleteLabel = labelIndex => {
    this.setState(prevState =>
      update(prevState, {
        labels: { $splice: [[labelIndex, 1]] }
      })
    );
  };

  handleUpdateLabel = (label, labelIndex) => {
    this.setState(prevState =>
      update(prevState, {
        labels: { [labelIndex]: { $set: label } }
      })
    );
  };

  render() {
    return (
      <Fragment>
        <PageHeader
          action={<Button onClick={this.handleToggle}>New label</Button>}
        >
          Labels
        </PageHeader>

        {this.state.isCreateSectionShown && (
          <Card>
            <LabelForm
              onSubmit={this.handleCreateLabel}
              onCancel={this.handleToggle}
            />
          </Card>
        )}

        {this.state.isLoading ? (
          <Alert isLoading>Loading the labels...</Alert>
        ) : (
          <Card noSpacing>
            {this.state.labels.map((label, index) => (
              <LabelItem
                label={label}
                labelIndex={index}
                key={label.id}
                onDelete={this.handleDeleteLabel}
                onUpdate={this.handleUpdateLabel}
              />
            ))}
          </Card>
        )}
      </Fragment>
    );
  }
}

export default withErrorDisplay(Labels);
