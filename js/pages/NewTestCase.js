import { h, Component, Fragment } from "preact";
import Input from "../components/Input";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

const INITIAL_STATE = {
  title: "",
  description: "",
  labels: ""
};

class NewTestCase extends Component {
  state = INITIAL_STATE;

  handleChange = evt => {
    var input = evt.target;

    this.setState({
      [input.id]: input.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.setState(INITIAL_STATE);
  };

  render() {
    return (
      <Fragment>
        <PageHeader>Create Testcase</PageHeader>

        <form onSubmit={this.handleSubmit} noValidate>
          <Input
            label="Title"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
            autoFocus
            required
            placeholder="Enter a descriptive title"
          />
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
          <Input
            label="Which browsers do you want to test?"
            name="browsers"
            id="browsers"
            value={this.state.browsers}
            onChange={this.handleChange}
            required
            placeholder="Write a comma separated list, e.g. Firefox, Chrome, Edge"
          />
          <Button type="submit">Create report</Button>
        </form>
      </Fragment>
    );
  }
}

export default NewTestCase;
