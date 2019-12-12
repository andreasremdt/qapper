import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";
import Card from "../components/Card";
import Button from "../components/Button";
import ActionGroup from "../components/ActionGroup";
import Alert from "../components/Alert";
import PageHeader from "../components/PageHeader";
import http from "../http";
import TestCaseContext from "../contexts/TestCaseContext";
import withErrorDisplay from "../hocs/withErrorDisplay";

class EditTestCase extends PureComponent {
  state = {
    buttonDisabled: false,
    loading: true,
    name: "",
    description: ""
  };

  static contextType = TestCaseContext;

  componentDidMount() {
    http
      .get(`test-case/${this.props.matches.id}`)
      .then(this.context.init)
      .catch(() =>
        this.props.displayError(
          "Could not fetch your test case. Please try again later."
        )
      )
      .finally(() => this.setState({ loading: false }));
  }

  handleAddGroup = () => {
    this.setState({ buttonDisabled: true });

    http
      .post("action-group", {
        name: "Empty Group",
        testCaseId: this.props.matches.id
      })
      .then(this.context.addActionGroup)
      .catch(() =>
        this.props.displayError(
          "Could not add a new group. Please try again later."
        )
      )
      .finally(() => {
        this.setState({ buttonDisabled: false });
      });
  };

  render() {
    return (
      <Fragment>
        <PageHeader>Edit Testcase</PageHeader>

        {this.state.loading ? (
          <Alert type="info" loading>
            Loading your test case...
          </Alert>
        ) : (
          <Fragment>
            <Card title="Overview">
              <h1>{this.context.name}</h1>
              <p>{this.context.description}</p>
            </Card>

            <Card title="Groups">
              {this.context.actionGroups.length ? (
                this.context.actionGroups.map((actionGroup, index) => (
                  <ActionGroup
                    actionGroup={actionGroup}
                    index={index}
                    key={actionGroup.id}
                  />
                ))
              ) : (
                <p>There are no groups, yet.</p>
              )}

              <Button
                onClick={this.handleAddGroup}
                loading={this.state.buttonDisabled}
              >
                {this.state.buttonDisabled ? "Adding group..." : "Add Group"}
              </Button>
            </Card>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withErrorDisplay(EditTestCase);
