import { h } from "preact";
import Router from "preact-router";
import Dashboard from "./pages/Dashboard";
import NewTestCase from "./pages/NewTestCase";
import ViewTestCase from "./pages/ViewTestCase";
import EditTestCase from "./pages/EditTestCase";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorMessage from "./components/ErrorMessage";
import { ContextWrapper } from "./contexts/GlobalContext";

function App() {
  return (
    <ErrorBoundary>
      <ContextWrapper>
        <Header />
        <Navigation />

        <main className="container mx-auto mt-6">
          <ErrorMessage />

          <Router>
            <Dashboard path="/" />
            <NewTestCase path="/testcases/create" />
            <ViewTestCase path="/testcases/:id" />
            <EditTestCase path="/testcases/:id/edit" />
          </Router>
        </main>
      </ContextWrapper>
    </ErrorBoundary>
  );
}

export default App;
