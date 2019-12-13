import { h } from "preact";
import { PureComponent } from "preact/compat";
import { Link } from "preact-router/match";
import Icon from "./Icon";
import Button from "../primitives/Button";
import IconButton from "../primitives/IconButton";
import FormGroup from "../primitives/FormGroup";
import Input from "../primitives/Input";
import LabelSelector from "./LabelSelector";
import "./Folder.scss";

class Folder extends PureComponent {
  state = {
    isCreateInstanceShown: false,
    isInstancePreviewShown: false,
    name: "",
    labels: [],
    buttonDisabled: false
  };

  handleToggle = evt => {
    evt.stopPropagation();

    this.setState({ isCreateInstanceShown: !this.state.isCreateInstanceShown });
  };

  handleToggleInstances = () => {
    this.setState({
      isInstancePreviewShown: !this.state.isInstancePreviewShown
    });
  };

  handleAddLabel = labels => {
    this.setState({ labels });
  };

  handleChange = evt => {
    this.setState({ name: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
  };

  get isInstanceValid() {
    return this.state.name && this.state.labels.length != 0;
  }

  render() {
    return (
      <article className="folder-tile">
        <header className="header" onClick={this.handleToggleInstances}>
          <Icon icon="folder" width="18" height="18" className="icon" />

          {this.props.testCase.name}

          <div className="button-group">
            <IconButton
              icon="plus"
              title="Create a new report"
              onClick={this.handleToggle}
            />

            <IconButton
              icon="edit"
              title="Edit this testcase"
              href={`/testcases/${this.props.testCase.id}/edit`}
            />

            <IconButton
              variant="danger"
              icon="trash"
              title="Delete this testcase"
            />
          </div>
        </header>

        {this.state.isCreateInstanceShown && (
          <form className="form" onSubmit={this.handleSubmit}>
            <FormGroup direction="right">
              <Input
                label="Name"
                type="text"
                id="name"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Test case instance name"
              />
            </FormGroup>

            <FormGroup direction="right">
              <LabelSelector
                labels={this.state.labels}
                availableLabels={this.props.testCase.labels}
                label="Select labels"
                onSubmit={this.handleAddLabel}
                placeholder="Type the label name and press `Enter`"
              />
            </FormGroup>

            <FormGroup direction="right">
              <Button
                variant="secondary"
                type="button"
                onClick={this.handleToggle}
              >
                Cancel
              </Button>
            </FormGroup>

            <Button
              type="submit"
              disabled={!this.isInstanceValid}
              loading={this.state.buttonDisabled}
            >
              Create instance
            </Button>
          </form>
        )}

        {this.state.isInstancePreviewShown && (
          <ul className="files">
            <li>
              <Link className="file" href="/testcases/123/view">
                <Icon icon="file" width="16" height="16" className="mr-2" />{" "}
                Chrome on SaaS
                <span className="progress">90% completed</span>
              </Link>
            </li>
            <li className="">
              <Link className="file" href="/testcases/create">
                <Icon icon="file" width="16" height="16" className="mr-2" />
                Chrome on Enterprise
                <span className="progress">0% completed</span>
              </Link>
            </li>
            <li className="">
              <Link className="file" href="/testcases/123/view">
                <Icon icon="file" width="16" height="16" className="mr-2" />
                Firefox on SaaS
                <span className="progress">11% completed</span>
              </Link>
            </li>
          </ul>
        )}
      </article>
    );
  }
}

export default Folder;
