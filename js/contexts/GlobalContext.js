import { h, Component, createContext } from "preact";

var GlobalContext = createContext({
  error: null
});

class ContextWrapper extends Component {
  state = { error: null };

  setError = error => {
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
      <GlobalContext.Provider
        value={{
          ...this.state,
          setError: this.setError,
          hideError: this.hideError
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContext;
export { ContextWrapper };
