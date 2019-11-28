import { h, createContext, Component } from "preact";
import update from "immutability-helper";

var TestCaseContext = createContext();

class TestCaseContextWrapper extends Component {
  state = { groups: [] };

  init = groups => {
    this.setState({ groups });
  };

  addGroup = group => {
    this.setState(prevState =>
      update(prevState, {
        groups: { $push: [group] }
      })
    );
  };

  removeGroup = index => {
    this.setState(prevState =>
      update(prevState, {
        groups: {
          $splice: [[index, 1]]
        }
      })
    );
  };

  renameGroup = (index, name) => {
    this.setState(prevState =>
      update(prevState, {
        groups: {
          [index]: { name: { $set: name } }
        }
      })
    );
  };

  addItem = (index, item) => {
    this.setState(prevState =>
      update(prevState, {
        groups: {
          [index]: { actionItems: { $push: [item] } }
        }
      })
    );
  };

  removeItem = (groupIndex, itemIndex) => {
    this.setState(prevState =>
      update(prevState, {
        groups: {
          [groupIndex]: { actionItems: { $splice: [[itemIndex, 1]] } }
        }
      })
    );
  };

  renameItem = (groupIndex, itemIndex, { name, description }) => {
    this.setState(prevState =>
      update(prevState, {
        groups: {
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
          addGroup: this.addGroup,
          removeGroup: this.removeGroup,
          renameGroup: this.renameGroup,
          addItem: this.addItem,
          removeItem: this.removeItem,
          renameItem: this.renameItem
        }}
      >
        {this.props.children}
      </TestCaseContext.Provider>
    );
  }
}

export { TestCaseContextWrapper };
export default TestCaseContext;
