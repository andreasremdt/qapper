import { h, Component, Fragment } from "preact";
import Icon from "../components/Icon";

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

// function ErrorMessage() {
//   var context = useContext(GlobalContext);

//   if (!context.error) {
//     return;
//   }

//   return (
//     <div className="bg-red-500 text-white rounded-sm py-2 px-4 fixed top-0 right-0 m-4 max-w-sm leading-tight pr-10">
//       <button
//         type="button"
//         onClick={context.hideError}
//         className="text-red-800 absolute top-0 right-0 mt-2 mr-2"
//       >
//         <Icon icon="cross" width="20" height="20" />
//       </button>
//       <strong className="mb-2 block">Something went wrong :(</strong>
//       <p>{context.error}</p>
//     </div>
//   );
// }

// export default ErrorMessage;
