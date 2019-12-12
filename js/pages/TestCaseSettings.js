import { h } from "preact";
import { PureComponent } from "preact/compat";
import { route } from "preact-router";
import Card from "../components/Card";
import Button from "../components/Button";
import http from "../http";
import withErrorDisplay from "../hocs/withErrorDisplay";

class TestCaseSettings extends PureComponent {
  state = {
    buttonDisabled: false
  };

  handleClick = () => {
    this.setState({ buttonDisabled: true });

    http
      .delete(`test-case/${this.props.matches.id}`)
      .then(() => route("/"))
      .catch(() => {
        this.props.displayError(
          "Could not fetch your test case. Please try again later."
        );

        this.setState({ buttonDisabled: true });
      });
  };

  render() {
    return (
      <Card title="Danger zone">
        <p class="mb-2">
          Deleting this Testcase cannot be reverted. Are you sure?
        </p>

        <Button
          variant="danger"
          onClick={this.handleClick}
          loading={this.state.buttonDisabled}
        >
          Yes, I confirm
        </Button>
      </Card>
    );
  }
}

export default withErrorDisplay(TestCaseSettings);
