import { h, Fragment, Component } from "preact";
import ErrorMessage from "./ErrorMessage";

class ErrorBoundary extends Component {
  state = { error: false, message: "" };

  static getDerivedStateFromError(error) {
    return { error: true, message: error.message };
  }

  render() {
    return (
      <Fragment>
        {this.props.children}

        {this.state.error && <ErrorMessage error={this.state.error} />}
      </Fragment>
    );
  }
}

export default ErrorBoundary;
