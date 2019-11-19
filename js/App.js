import { h } from "preact";
import Router from "preact-router";
import Dashboard from "./pages/Dashboard";
import NewTestCase from "./pages/NewTestCase";
import ViewTestCase from "./pages/ViewTestCase";
import EditTestCase from "./pages/EditTestCase";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Navigation />

      <main className="container mx-auto mt-6">
        <Router>
          <Dashboard path="/" />
          <NewTestCase path="/testcases/create" />
          <ViewTestCase path="/testcases/:id" />
          <EditTestCase path="/testcases/:id/edit" />
        </Router>
      </main>
    </ErrorBoundary>
  );
}

export default App;
