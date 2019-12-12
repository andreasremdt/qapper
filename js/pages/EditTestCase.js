import { h, Fragment } from "preact";
import PageHeader from "../components/PageHeader";
import { Link } from "preact-router/match";

function EditTestCase({ children, matches }) {
  return (
    <Fragment>
      <PageHeader>Edit Testcase</PageHeader>

      <nav className="border-b border-solid border-gray-200 mb-6">
        <Link
          className="inline-block p-3 -m-px"
          href={`/testcases/${matches.id}/edit`}
          activeClassName="border-b border-solid border-gray-500"
        >
          General
        </Link>
        <Link
          className="inline-block p-3 -m-px"
          href={`/testcases/${matches.id}/edit/content`}
          activeClassName="border-b border-solid border-gray-500"
        >
          Edit Groups & Items
        </Link>
        <Link
          className="inline-block p-3 -m-px"
          href={`/testcases/${matches.id}/edit/settings`}
          activeClassName="border-b border-solid border-gray-500"
        >
          Settings
        </Link>
      </nav>

      {children}
    </Fragment>
  );
}

export default EditTestCase;
