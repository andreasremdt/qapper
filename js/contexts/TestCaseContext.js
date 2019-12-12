import { h, createContext, Component } from "preact";
import update from "immutability-helper";

var TestCaseContext = createContext();

class TestCaseContextWrapper extends Component {
  state = { name: "", description: "", actionGroups: [] };

  init = ({ name, description, actionGroups }) => {
    this.setState({ name, description, actionGroups });
  };

  addActionGroup = group => {
    this.setState(prevState =>
      update(prevState, {
        actionGroups: { $push: [group] }
      })
    );
  };

  removeActionGroup = index => {
    this.setState(prevState =>
      update(prevState, {
        actionGroups: {
          $splice: [[index, 1]]
        }
      })
    );
  };

  renameActionGroup = (index, name) => {
    this.setState(prevState =>
      update(prevState, {
        actionGroups: {
          [index]: { name: { $set: name } }
        }
      })
    );
  };

  addActionItem = (index, item) => {
    this.setState(prevState =>
      update(prevState, {
        actionGroups: {
          [index]: { actionItems: { $push: [item] } }
        }
      })
    );
  };

  removeActionItem = (groupIndex, itemIndex) => {
    this.setState(prevState =>
      update(prevState, {
        actionGroups: {
          [groupIndex]: { actionItems: { $splice: [[itemIndex, 1]] } }
        }
      })
    );
  };

  renameActionItem = (groupIndex, itemIndex, { name, description }) => {
    this.setState(prevState =>
      update(prevState, {
        actionGroups: {
          [groupIndex]: {
            actionItems: { [itemIndex]: { $merge: { name, description } } }
          }
        }
      })
    );
  };

  render() {
    return (
      <TestCaseContext.Provider
        value={{
          ...this.state,
          init: this.init,
          addActionGroup: this.addActionGroup,
          removeActionGroup: this.removeActionGroup,
          renameActionGroup: this.renameActionGroup,
          addActionItem: this.addActionItem,
          removeActionItem: this.removeActionItem,
          renameActionItem: this.renameActionItem
        }}
      >
        {this.props.children}
      </TestCaseContext.Provider>
    );
  }
}

export { TestCaseContextWrapper };
export default TestCaseContext;
