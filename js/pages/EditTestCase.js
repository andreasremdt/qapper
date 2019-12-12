import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";
import Card from "../components/Card";
import Button from "../components/Button";
import ActionGroup from "../components/ActionGroup";
import Alert from "../components/Alert";
import Input from "../components/Input";
import Badge from "../components/Badge";
import PageHeader from "../components/PageHeader";
import http from "../http";
import TestCaseContext from "../contexts/TestCaseContext";
import withErrorDisplay from "../hocs/withErrorDisplay";
import { Link } from "preact-router";

class EditTestCase extends PureComponent {
  state = {
    buttonDisabled: false,
    loading: true,
    name: "",
    description: ""
  };

  static contextType = TestCaseContext;

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

  componentDidMount() {
    http
      .get(`test-case/${this.props.matches.id}`)
      .then(({ name, description, actionGroups }) => {
        this.context.init(actionGroups);

        this.setState({ name, description });
      })
      .catch(() =>
        this.props.displayError(
          "Could not fetch your test case. Please try again later."
        )
      )
      .finally(() => this.setState({ loading: false }));
  }

  handleAddGroup = () => {
    this.setState({ buttonDisabled: true });

    http
      .post("action-group", {
        name: "Empty Group",
        testCaseId: this.props.matches.id
      })
      .then(this.context.addActionGroup)
      .catch(() =>
        this.props.displayError(
          "Could not add a new group. Please try again later."
        )
      )
      .finally(() => {
        this.setState({ buttonDisabled: false });
      });
  };

  render() {
    return (
      <Fragment>
        <PageHeader>Edit Testcase</PageHeader>

        <nav className="border-b border-solid border-gray-200 mb-6">
          <Link
            className="inline-block py-3 px-4 border-b border-solid border-gray-500 -m-px"
            href="#general"
          >
            General
          </Link>
          <Link className="inline-block py-3 px-4 -m-px" href="#edit">
            Edit Groups & Items
          </Link>
          <Link className="inline-block py-3 px-4 -m-px" href="#settings">
            Settings
          </Link>
        </nav>

        {this.state.loading ? (
          <Alert type="info" loading>
            Loading your test case...
          </Alert>
        ) : (
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
              <label
                className="font-semibold block text-sm w-40 mt-2"
                htmlFor=""
              >
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
        )}
      </Fragment>
    );
  }
}

export default withErrorDisplay(EditTestCase);

// <Fragment>
//   <Card title="Overview">
//     <h1>{this.context.name}</h1>
//     <p>{this.context.description}</p>
//   </Card>

//   <Card title="Groups">
//     {this.context.actionGroups.length ? (
//       this.context.actionGroups.map((actionGroup, index) => (
//         <ActionGroup
//           actionGroup={actionGroup}
//           index={index}
//           key={actionGroup.id}
//         />
//       ))
//     ) : (
//       <p>There are no groups, yet.</p>
//     )}

//     <Button
//       onClick={this.handleAddGroup}
//       loading={this.state.buttonDisabled}
//     >
//       {this.state.buttonDisabled ? "Adding group..." : "Add Group"}
//     </Button>
//   </Card>
// </Fragment>
