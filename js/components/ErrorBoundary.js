import { h, Fragment, Component } from "preact";

class ErrorBoundary extends Component {
  state = { error: false, message: "" };

  static getDerivedStateFromError(error) {
    return { error: true, message: error.message };
  }

  render() {
    return (
      <Fragment>
        {this.props.children}

        {this.state.error && (
          <div className="fixed bottom-0 right-0 mr-4 mb-4 bg-red-500 text-white rounded-sm px-4 py-2">
            <p>
              Sorry, something went wrong. Please{" "}
              <a href="javascript:location.reload();" className="underline">
                reload the page
              </a>
              .
            </p>
            <p>
              <code class="text-xs">{this.state.message}</code>
            </p>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ErrorBoundary;
