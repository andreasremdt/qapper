import { h } from "preact";
import Router from "preact-router";
import Dashboard from "./pages/Dashboard";
import CreateTestCase from "./pages/CreateTestCase";
import ViewTestCase from "./pages/ViewTestCase";
import EditTestCase from "./pages/EditTestCase";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { TestCaseContextWrapper } from "./contexts/TestCaseContext";

function App() {
  return (
    <ErrorBoundary>
      <Header />

      <main className="container mx-auto mt-6">
        <TestCaseContextWrapper>
          <Router>
            <Dashboard path="/" />
            <CreateTestCase path="/testcases/create" />
            <ViewTestCase path="/testcases/:id" />
            <EditTestCase path="/testcases/:id/edit" />
          </Router>
        </TestCaseContextWrapper>
      </main>
    </ErrorBoundary>
  );
}

export default App;
