import { h } from "preact";
import { PureComponent } from "preact/compat";
import update from "immutability-helper";
import { Link } from "preact-router/match";
import Badge from "./Badge";
import Icon from "./Icon";
import http from "../http";
import withErrorDisplay from "../hocs/withErrorDisplay";

class LabelSelector extends PureComponent {
  state = {
    labels: [],
    isDropdownShown: false,
    filter: ""
  };

  componentDidMount() {
    if (this.props.availableLabels) {
      this.setState({
        labels: this.props.availableLabels
      });
    } else {
      http
        .get("label")
        .then(labels => this.setState({ labels }))
        .catch(() => {
          this.props.displayError(
            "Could not fetch the labels. Please try again later."
          );
        });
    }
  }

  handleChange = evt => {
    this.setState({
      filter: evt.target.value
    });
  };

  handleShowDropdown = () => {
    this.setState({ isDropdownShown: true });
  };

  handleHideDropdown = () => {
    setTimeout(() => {
      this.setState({ isDropdownShown: false, filter: "" });
    }, 100);
  };

  handleKeyDown = evt => {
    if (evt.key == "Escape") {
      this.setState({ filter: "" });
    } else if (evt.key == "Enter" && this.filteredLabels.length > 0) {
      this.props.onSubmit(
        update(this.props.labels, { $push: [this.filteredLabels[0]] })
      );

      this.setState({ filter: "" });
    } else if (evt.key == "Backspace" && this.state.filter == "") {
      this.props.onSubmit(
        update(this.props.labels, {
          $splice: [[this.props.labels.length - 1, 1]]
        })
      );
    }
  };

  handleClick = label => () => {
    this.setState({ filter: "" });

    this.props.onSubmit(update(this.props.labels, { $push: [label] }));
  };

  handleDelete = labelIndex => () => {
    this.props.onSubmit(
      update(this.props.labels, { $splice: [[labelIndex, 1]] })
    );
  };

  get filteredLabels() {
    return this.state.labels.filter(({ name }) => {
      if (
        name.toLowerCase().includes(this.state.filter.toLowerCase()) &&
        !this.props.labels.find(label => label.name == name)
      ) {
        return true;
      }
    });
  }

  render() {
    return (
      <div className="relative">
        {this.props.label && (
          <label className="font-semibold block text-sm mb-1" htmlFor="label">
            {this.props.label}
          </label>
        )}

        <div
          className={`border border-solid border-gray-200 px-2 flex items-center h-10 bg-white rounded-sm hover:border-gray-400 ${
            this.state.isDropdownShown ? "border-blue-500 shadow-outline" : ""
          }`}
        >
          {this.props.labels.map((label, labelIndex) => (
            <Badge color={label.color} onDelete={this.handleDelete(labelIndex)}>
              {label.name}
            </Badge>
          ))}
          <input
            onChange={this.handleChange}
            value={this.state.filter}
            onFocus={this.handleShowDropdown}
            onBlur={this.handleHideDropdown}
            onKeyDown={this.handleKeyDown}
            placeholder={this.props.placeholder}
            name="label"
            className="text-gray-700 ml-2 w-full"
          />
        </div>

        {this.state.isDropdownShown && (
          <div className="bg-white absolute w-2/4 -mt-px border border-solid border-gray-200 rounded-br-sm rounded-bl-sm">
            <ul>
              {this.filteredLabels.length == 0 && (
                <li className="p-2 border-b border-solid border-gray-100 text-gray-400">
                  Nothing found :(
                </li>
              )}

              {this.filteredLabels.map(label => (
                <li
                  key={label.id}
                  onMouseDown={this.handleClick(label)}
                  className="py-1 px-2 cursor-pointer hover:bg-gray-100 border-b border-solid border-gray-100"
                >
                  <Badge color={label.color}>{label.name}</Badge>
                </li>
              ))}
            </ul>
            <Link
              href="/labels"
              className="p-2 block hover:bg-gray-100 flex items-center"
            >
              <Icon icon="tag" width="16" height="16" className="mr-1" />
              Manage labels
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withErrorDisplay(LabelSelector);
