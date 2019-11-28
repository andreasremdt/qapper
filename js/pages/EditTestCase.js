import { h, Component, Fragment } from "preact";
import Card from "../components/Card";
import Button from "../components/Button";
import ActionGroup from "../components/ActionGroup";
import Alert from "../components/Alert";
import http from "../http";
import TestCaseContext from "../contexts/TestCaseContext";

class EditTestCase extends Component {
  state = { buttonDisabled: false };

  static contextType = TestCaseContext;

  componentDidMount() {
    http
      .get("action-group")
      .then(this.context.init)
      .catch(() => {
        // this.context.setError(
        //   "Could not fetch your groups. Please try again later."
        // );
      });
  }

  handleAddGroup = () => {
    this.setState({ buttonDisabled: true });

    http
      .post("action-group", { name: "Empty Group" })
      .then(this.context.addGroup)
      .catch(() => {
        // this.context.setError(
        //   "Could not add a new group. Please try again later."
        // );
      })
      .finally(() => {
        this.setState({ buttonDisabled: false });
      });
  };

  render() {
    return (
      <Fragment>
        <header className="mb-4">
          <h1 className="text-xl">Edit Testcase</h1>
        </header>

        <Card title="Overview">
          <p>Hello World</p>
        </Card>

        <Card title="Groups">
          {this.context.groups.length ? (
            <Fragment>
              {this.context.groups.map((group, index) => (
                <ActionGroup group={group} index={index} key={group.id} />
              ))}
              <Button
                onClick={this.handleAddGroup}
                loading={this.state.buttonDisabled}
              >
                {this.state.buttonDisabled ? "Adding group..." : "Add Group"}
              </Button>
            </Fragment>
          ) : (
            <Alert type="info" loading>
              Loading your data...
            </Alert>
          )}
        </Card>
      </Fragment>
    );
  }
}

export default EditTestCase;
