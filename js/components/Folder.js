import { h } from "preact";
import { PureComponent } from "preact/compat";
import { Link } from "preact-router/match";
import Icon from "./Icon";
import Button from "./Button";
import Input from "./Input";
import LabelSelector from "./LabelSelector";

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
      <article className="border border-solid border-gray-200 bg-white mb-2 rounded-sm">
        <header
          className="flex items-center cursor-pointer p-4"
          onClick={this.handleToggleInstances}
        >
          <Icon icon="folder" width="18" height="18" className="mr-2" />

          {this.props.testCase.name}

          <Button
            icon="plus"
            simple
            title="Create a new report"
            className="ml-auto mr-3"
            onClick={this.handleToggle}
          />

          <Button
            icon="edit"
            simple
            title="Edit this testcase"
            className="mr-3"
            href={`/testcases/${this.props.testCase.id}/edit`}
          />

          <Button
            variant="danger"
            icon="trash"
            simple
            title="Delete this testcase"
          />
        </header>

        {this.state.isCreateInstanceShown && (
          <form className="p-4 flex items-end" onSubmit={this.handleSubmit}>
            <div className="mr-3 w-1/3">
              <Input
                label="Name"
                type="text"
                id="name"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Testcase instance name"
              />
            </div>

            <div className="mr-8 flex-1">
              <LabelSelector
                labels={this.state.labels}
                availableLabels={this.props.testCase.labels}
                label="Select labels"
                onSubmit={this.handleAddLabel}
                placeholder="Type the label name and press `Enter`"
              />
            </div>

            <Button
              variant="secondary"
              type="button"
              onClick={this.handleToggle}
              className="mr-2"
            >
              Cancel
            </Button>

            <Button
              variant="warning"
              type="submit"
              disabled={!this.isInstanceValid}
              loading={this.state.buttonDisabled}
            >
              Create instance
            </Button>
          </form>
        )}

        {this.state.isInstancePreviewShown && (
          <ul className="border-t border-solid border-gray-100">
            <li className="border-b border-solid border-gray-100 hover:bg-gray-100">
              <Link
                className="flex items-center py-2 pl-8 pr-4"
                href="/testcases/123/view"
              >
                <Icon icon="file" width="16" height="16" className="mr-2" />{" "}
                Chrome on SaaS
                <span className="ml-auto text-sm text-gray-500">
                  90% completed
                </span>
              </Link>
            </li>
            <li className="border-b border-solid border-gray-100 hover:bg-gray-100">
              <Link
                className="flex items-center py-2 pl-8 pr-4"
                href="/testcases/create"
              >
                <Icon icon="file" width="16" height="16" className="mr-2" />
                Chrome on Enterprise
                <span className="ml-auto text-sm text-gray-500">
                  0% completed
                </span>
              </Link>
            </li>
            <li className="hover:bg-gray-100">
              <Link
                className="flex items-center py-2 pl-8 pr-4"
                href="/testcases/123/view"
              >
                <Icon icon="file" width="16" height="16" className="mr-2" />
                Firefox on SaaS
                <span className="ml-auto text-sm text-gray-500">
                  11% completed
                </span>
              </Link>
            </li>
          </ul>
        )}
      </article>
    );
  }
}

export default Folder;
