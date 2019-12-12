import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";
import Input from "../components/Input";
import Badge from "../components/Badge";
import Button from "../components/Button";

class LabelForm extends PureComponent {
  state = {
    name: "",
    description: "",
    color: "#",
    buttonDisabled: false
  };

  componentDidMount() {
    if (this.props.label) {
      this.setState(this.props.label);
    }
  }

  handleChange = evt => {
    var input = evt.target;

    this.setState({
      [input.id]: input.value
    });
  };

  handleColorGeneration = () => {
    this.setState({
      color: "#" + ((Math.random() * 0xffffff) << 0).toString(16)
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.setState({ buttonDisabled: true });

    var { name, description, color } = this.state;

    this.props.onSubmit({ name, description, color });
  };

  get isLabelValid() {
    return this.state.name && this.state.color;
  }

  get buttonText() {
    return this.props.label ? "Update label" : "Create label";
  }

  render() {
    return (
      <Fragment>
        <Badge color={this.state.color} className="mb-6">
          {this.state.name || "Label preview"}
        </Badge>

        <form className="flex items-end" onSubmit={this.handleSubmit}>
          <div className="mr-3 w-64">
            <Input
              label="Label name"
              type="text"
              id="name"
              placeholder="Label name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>

          <div className="mr-3 flex-1">
            <Input
              label="Label description"
              type="text"
              id="description"
              placeholder="Label description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>

          <Button
            icon="refresh"
            variant="secondary"
            type="button"
            onClick={this.handleColorGeneration}
            className="mr-2"
          />

          <div className="mr-8 w-32">
            <Input
              label="Label color"
              type="text"
              id="color"
              placeholder="HEX code"
              onChange={this.handleChange}
              value={this.state.color}
            />
          </div>

          <Button
            variant="secondary"
            type="button"
            onClick={this.props.onCancel}
            className="mr-2"
          >
            Cancel
          </Button>

          <Button
            variant="warning"
            type="submit"
            disabled={!this.isLabelValid}
            loading={this.state.buttonDisabled}
          >
            {this.state.buttonDisabled ? "Loading..." : this.buttonText}
          </Button>
        </form>
      </Fragment>
    );
  }
}

export default LabelForm;
