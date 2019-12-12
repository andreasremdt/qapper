import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";
import Folder from "../components/Folder";
import Alert from "../components/Alert";
import PageHeader from "../components/PageHeader";
import withErrorDisplay from "../hocs/withErrorDisplay";
import http from "../http";

class Dashboard extends PureComponent {
  state = {
    testCases: [],
    loading: true
  };

  componentDidMount() {
    http
      .get("test-case")
      .then(testCases => this.setState({ testCases, loading: false }))
      .catch(() =>
        this.props.displayError(
          "Could not fetch your groups. Please try again later."
        )
      );
  }

  render() {
    return (
      <Fragment>
        <PageHeader>Dashboard</PageHeader>

        {this.state.loading ? (
          <Alert type="info" loading>
            Loading your test cases...
          </Alert>
        ) : this.state.testCases.length == 0 ? (
          <p>There are no testcases, yet.</p>
        ) : (
          this.state.testCases.map(testCase => <Folder testCase={testCase} />)
        )}
      </Fragment>
    );
  }
}

export default withErrorDisplay(Dashboard);
