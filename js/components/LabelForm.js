import { h } from "preact";
import { PureComponent } from "preact/compat";
import Input from "../primitives/Input";
import Badge from "../primitives/Badge";
import Button from "../primitives/Button";
import FormGroup from "../primitives/FormGroup";
import "./LabelForm.scss";

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
      <div className="label-form">
        <Badge color={this.state.color}>
          {this.state.name || "Label preview"}
        </Badge>

        <form className="form" onSubmit={this.handleSubmit}>
          <FormGroup direction="right">
            <Input
              label="Label name"
              type="text"
              id="name"
              placeholder="Label name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </FormGroup>

          <FormGroup direction="right" className="description">
            <Input
              label="Label description"
              type="text"
              id="description"
              placeholder="Label description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </FormGroup>

          <FormGroup direction="right">
            <Button
              icon="refresh"
              variant="secondary"
              type="button"
              onClick={this.handleColorGeneration}
            />
          </FormGroup>

          <FormGroup direction="right">
            <Input
              label="Label color"
              type="text"
              id="color"
              placeholder="HEX code"
              onChange={this.handleChange}
              value={this.state.color}
            />
          </FormGroup>

          <FormGroup direction="right">
            <Button
              variant="secondary"
              type="button"
              onClick={this.props.onCancel}
            >
              Cancel
            </Button>
          </FormGroup>

          <Button
            type="submit"
            disabled={!this.isLabelValid}
            loading={this.state.buttonDisabled}
          >
            {this.state.buttonDisabled ? "Loading..." : this.buttonText}
          </Button>
        </form>
      </div>
    );
  }
}

export default LabelForm;
