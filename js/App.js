import { h } from "preact";
import Router from "preact-router";
import Dashboard from "./pages/Dashboard";
import CreateTestCase from "./pages/CreateTestCase";
// import ViewTestCase from "./pages/ViewTestCase";
import EditTestCase from "./pages/EditTestCase";
import TestCaseGeneral from "./pages/TestCaseGeneral";
import TestCaseContent from "./pages/TestCaseContent";
import TestCaseSettings from "./pages/TestCaseSettings";
import Labels from "./pages/Labels";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { TestCaseContextWrapper } from "./contexts/TestCaseContext";

function App() {
  return (
    <ErrorBoundary>
      <Header />

      <main className="container">
        <TestCaseContextWrapper>
          <Router>
            <Dashboard path="/" />
            <CreateTestCase path="/testcases/create" />
            <Labels path="/labels" />
            <EditTestCase path="/testcases/:id/edit/:*?">
              <Router>
                <TestCaseGeneral path="/testcases/:id/edit" />
                <TestCaseContent path="/testcases/:id/edit/content" />
                <TestCaseSettings path="/testcases/:id/edit/settings" />
              </Router>
            </EditTestCase>
            {/* <ViewTestCase path="/testcases/:id" />*/}
          </Router>
        </TestCaseContextWrapper>
      </main>
    </ErrorBoundary>
  );
}

export default App;
