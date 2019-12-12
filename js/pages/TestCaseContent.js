import { h } from "preact";
import { PureComponent } from "preact/compat";
import TestCaseContext from "../contexts/TestCaseContext";
import Card from "../components/Card";
import Button from "../components/Button";
import ActionGroup from "../components/ActionGroup";
import withErrorDisplay from "../hocs/withErrorDisplay";
import http from "../http";

class TestCaseContent extends PureComponent {
  state = {
    loading: true,
    buttonDisabled: false
  };

  static contextType = TestCaseContext;

  componentDidMount() {
    http
      .get(`test-case/${this.props.matches.id}`)
      .then(({ actionGroups }) => {
        this.context.init(actionGroups);
      })
      .catch(() =>
        this.props.displayError(
          "Could not fetch your action groups. Please try again later."
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
    );
  }
}

export default withErrorDisplay(TestCaseContent);
