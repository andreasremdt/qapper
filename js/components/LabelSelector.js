import { h } from "preact";
import { PureComponent } from "preact/compat";
import update from "immutability-helper";
import { Link } from "preact-router/match";
import Badge from "../primitives/Badge";
import Label from "../primitives/Label";
import Icon from "./Icon";
import http from "../http";
import withErrorDisplay from "../hocs/withErrorDisplay";
import "./LabelSelector.scss";

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
      <div className="label-selector">
        {this.props.label && <Label htmlFor="label">{this.props.label}</Label>}

        <div className="form-control">
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
            className="input"
          />
        </div>

        {this.state.isDropdownShown && (
          <div className="label-dropdown">
            <ul className="list">
              {this.filteredLabels.length == 0 && (
                <li className="notfound">Nothing found :(</li>
              )}

              {this.filteredLabels.map(label => (
                <li
                  key={label.id}
                  onMouseDown={this.handleClick(label)}
                  className="item"
                >
                  <Badge color={label.color}>{label.name}</Badge>
                </li>
              ))}
            </ul>
            <Link href="/labels" className="manage">
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
