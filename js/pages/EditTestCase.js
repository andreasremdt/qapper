import { h, Component, Fragment } from "preact";
import update from "immutability-helper";
import Card from "../components/Card";
import Button from "../components/Button";
import ActionGroup from "../components/ActionGroup";
import Alert from "../components/Alert";
import http from "../http";
import GlobalContext from "../contexts/GlobalContext";

class EditTestCase extends Component {
  state = { groups: [], loading: true, buttonDisabled: false };

  static contextType = GlobalContext;

  componentDidMount() {
    http.get("action-group").then(groups => {
      this.setState({ groups });
    });
  }

  handleRemoveGroup = (groupId, index) => {
    this.setState(prevState =>
      update(prevState, {
        groups: {
          $splice: [[index, 1]]
        }
      })
    );

    http.delete(`action-group/${groupId}`).catch(() => {
      this.context.setError(
        "Could not delete this group. Please try again later."
      );
    });
  };

  handleRenameGroup = (groupId, index, newName) => {
    this.setState(prevState =>
      update(prevState, {
        groups: {
          [index]: { name: { $set: newName } }
        }
      })
    );

    http.patch(`action-group/${groupId}`, { name: newName }).catch(() => {
      this.context.setError(
        "Could not update this group's name. Please try again later."
      );
    });
  };

  handleAddGroup = () => {
    this.setState({ buttonDisabled: true });

    http
      .post("action-group", { name: "Empty Group" })
      .then(group => {
        this.setState(prevState =>
          update(prevState, {
            groups: { $push: [group] },
            buttonDisabled: { $set: false }
          })
        );
      })
      .catch(() => {
        this.context.setError(
          "Could not add a new group. Please try again later."
        );

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
          {this.state.groups && this.state.groups.length ? (
            <Fragment>
              {this.state.groups.map((group, index) => (
                <ActionGroup
                  group={group}
                  index={index}
                  key={group.id}
                  onRemove={this.handleRemoveGroup}
                  onRename={this.handleRenameGroup}
                />
              ))}
              <Button
                onClick={this.handleAddGroup}
                disabled={this.state.buttonDisabled}
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
