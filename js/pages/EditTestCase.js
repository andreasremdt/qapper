import { h, Component, Fragment } from "preact";
import update from "immutability-helper";
import Card from "../components/Card";
import Button from "../components/Button";
import ActionGroup from "../components/ActionGroup";

const INITIAL_STATE = {
  groups: [
    {
      id: "534",
      name: "Login",
      items: [
        {
          id: "346456",
          name: "a user can login",
          description: ""
        },
        {
          id: "34644",
          name: "a user can't login with invalid credentials",
          description: ""
        },
        {
          id: "346442",
          name: "a user can reset his password",
          description: "Only valid for certain pages"
        }
      ]
    },
    {
      id: "45435",
      name: "Some other group",
      items: []
    }
  ]
};

class EditTestCase extends Component {
  state = INITIAL_STATE;

  handleRemoveGroup = index => {
    this.setState(prevState => {
      return update(prevState, {
        groups: {
          $splice: [[index, 1]]
        }
      });
    });
  };

  handleRenameGroup = (index, newName) => {
    this.setState(prevState => {
      return update(prevState, {
        groups: {
          [index]: { name: { $set: newName } }
        }
      });
    });
  };

  handleAddGroup = () => {
    var emptyGroup = {
      id: "5454545",
      name: "Empty Group",
      items: []
    };

    this.setState(
      update(this.state, {
        groups: { $push: [emptyGroup] }
      })
    );
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
          {this.state.groups.map((group, index) => (
            <ActionGroup
              group={group}
              index={index}
              key={group.id}
              onRemove={this.handleRemoveGroup}
              onRename={this.handleRenameGroup}
            />
          ))}
          <Button onClick={this.handleAddGroup}>Add Group</Button>
        </Card>
      </Fragment>
    );
  }
}

export default EditTestCase;
