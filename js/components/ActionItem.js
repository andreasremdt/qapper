import { h, Component } from "preact";
import Icon from "../components/Icon";

class ActionItem extends Component {
  render() {
    return (
      <div className="flex items-center mb-1">
        <input
          className="w-2/4 px-2 border border-solid border-gray-300 rounded-sm mr-2 text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          value={this.props.name}
          placeholder="Enter an action name"
        />
        <input
          className="w-2/4 px-2 border border-solid border-gray-300 rounded-sm mr-2 text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
          value={this.props.description}
          placeholder="Enter an action description"
        />
        <button type="button" className="text-gray-600 hover:text-red-400">
          <Icon
            className="pointer-events-none"
            width="18"
            height="18"
            icon="trash"
          />
        </button>
      </div>
    );
  }
}

export default ActionItem;
