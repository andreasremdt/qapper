import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";
import Alert from "../components/Alert";
import Badge from "../components/Badge";
import withErrorDisplay from "../hocs/withErrorDisplay";
import http from "../http";

class TestCaseGeneral extends PureComponent {
  state = {
    loading: true,
    name: "",
    description: ""
  };

  componentDidMount() {
    http
      .get(`test-case/${this.props.matches.id}`)
      .then(({ name, description }) => {
        this.setState({ name, description });
      })
      .catch(() =>
        this.props.displayError(
          "Could not fetch your test case. Please try again later."
        )
      )
      .finally(() => this.setState({ loading: false }));
  }

  handleBlur = evt => {
    var input = evt.target;

    if (input.value != this.state[input.id]) {
      http
        .patch(`test-case/${this.props.matches.id}`, {
          [input.id]: input.value
        })
        .then(() => {
          this.setState({
            [input.id]: input.value
          });
        })
        .catch(() => {
          this.props.displayError(
            "Could not update this testcase. Please try again later."
          );
        });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <Alert type="info" loading>
          Loading your test case...
        </Alert>
      );
    }

    return (
      <Fragment>
        <div className="flex mb-3">
          <label
            className="font-semibold block text-sm w-40 mt-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            onBlur={this.handleBlur}
            className="border border-solid border-gray-300 px-3 flex-1 text-gray-700 py-2 rounded-sm hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
            value={this.state.name}
            placeholder="The name of this testcase"
            required
          />
        </div>

        <div className="flex">
          <label
            className="font-semibold block text-sm w-40 mt-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="border border-solid border-gray-300 px-3 flex-1 text-gray-700 py-2 rounded-sm hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
            id="description"
            onBlur={this.handleBlur}
            value={this.state.description}
            placeholder="A description of this testcase"
          />
        </div>

        <hr className="my-8" />

        <div className="flex mb-3">
          <label className="font-semibold block text-sm w-40 mt-2" htmlFor="">
            Labels:
          </label>
          <div className="flex-1">
            <input
              type="text"
              className="border border-solid border-gray-300 px-3 w-full mb-2 text-gray-700 py-2 rounded-sm hover:border-gray-400 focus:border-blue-500 focus:shadow-outline"
              placeholder="To add a label, just search for it and press ,"
              required
            />
            <Badge>Chrome</Badge>
            <Badge>Firefox</Badge>
            <Badge>Enterprise</Badge>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withErrorDisplay(TestCaseGeneral);
