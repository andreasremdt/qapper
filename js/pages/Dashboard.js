import { h, Component, Fragment } from "preact";
import { Link } from "preact-router/match";
import Icon from "../components/Icon";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader>Dashboard</PageHeader>

        <details
          className="border border-solid border-gray-300 bg-white mb-2 rounded-sm"
          open
        >
          <summary className="flex items-center cursor-pointer p-4">
            <Icon icon="folder" width="18" height="18" className="mr-2" />
            Cawemo QA
            <Button
              icon="plus"
              simple
              title="Create a new report"
              className="ml-auto mr-3"
            />
            <Button
              icon="edit"
              simple
              title="Edit this testcase"
              className="mr-3"
            />
            <Button
              variant="danger"
              icon="trash"
              simple
              title="Delete this testcase"
            />
          </summary>
          <ul className="border-t border-solid border-gray-300">
            <li className="border-b border-solid border-gray-300">
              <Link
                className="flex items-center py-2 pl-8 pr-4"
                href="/testcases/123/view"
              >
                <Icon icon="file" width="16" height="16" className="mr-2" />{" "}
                Chrome on SaaS
                <span className="ml-auto text-sm text-gray-500">
                  90% completed
                </span>
              </Link>
            </li>
            <li className="border-b border-solid border-gray-300">
              <Link
                className="flex items-center py-2 px-8"
                href="/testcases/create"
              >
                <Icon icon="file" width="16" height="16" className="mr-2" />
                Chrome on Enterprise
                <span className="ml-auto text-sm text-gray-500">
                  0% completed
                </span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center py-2 px-8"
                href="/testcases/123/view"
              >
                <Icon icon="file" width="16" height="16" className="mr-2" />
                Firefox on SaaS
                <span className="ml-auto text-sm text-gray-500">
                  11% completed
                </span>
              </Link>
            </li>
          </ul>
        </details>
      </Fragment>
    );
  }
}

export default Dashboard;
