import { h, Component, Fragment } from "preact";

function withErrorDisplay(WrappedComponent) {
  class ErrorMessage extends Component {
    state = { error: null };

    displayError = error => {
      this.setState({ error });

      setTimeout(() => {
        this.hideError();
      }, 5000);
    };

    hideError = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          {this.state.error && (
            <ErrorMessage error={this.state.error} onClose={this.hideError} />
          )}

          <WrappedComponent displayError={this.displayError} {...this.props} />
        </Fragment>
      );
    }
  }

  return ErrorMessage;
}

export default withErrorDisplay;
