import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";
import { route } from "preact-router";
import Input from "../primitives/Input";
import FormGroup from "../primitives/FormGroup";
import Button from "../primitives/Button";
import PageHeader from "../primitives/PageHeader";
import withErrorDisplay from "../hocs/withErrorDisplay";
import http from "../http";

class NewTestCase extends PureComponent {
  state = {
    name: "",
    description: "",
    buttonDisabled: false
  };

  handleChange = evt => {
    var input = evt.target;

    this.setState({
      [input.id]: input.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.setState({ buttonDisabled: true });

    http
      .post("test-case", { ...this.state })
      .then(({ id }) => route(`/testcases/${id}/edit`))
      .catch(() =>
        this.props.displayError(
          "Could not create test case. Please try again later."
        )
      )
      .finally(() => {
        this.setState({ buttonDisabled: false });
      });
  };

  render() {
    return (
      <Fragment>
        <PageHeader>Create Testcase</PageHeader>

        <form onSubmit={this.handleSubmit} noValidate>
          <FormGroup>
            <Input
              label="Title"
              name="name"
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              autoFocus
              required
              placeholder="Enter a descriptive title"
            />
          </FormGroup>

          <FormGroup>
            <Input
              label="Description"
              name="description"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
              multiline
              rows="4"
              placeholder="Enter a description"
            />
          </FormGroup>

          <Button
            type="submit"
            icon="trash"
            isLoading={this.state.buttonDisabled}
          >
            {this.state.buttonDisabled ? "Saving..." : "Continue"}
          </Button>
        </form>
      </Fragment>
    );
  }
}

export default withErrorDisplay(NewTestCase);
