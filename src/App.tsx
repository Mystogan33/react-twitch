import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Spinner from './components/Spinner/Spinner';

const Header = lazy(() => import('./components/Header/Header'));
const Sidebar = lazy(() => import('./components/Sidebar/Sidebar'));
const Games = lazy(() => import('./components/Games/Games'));
const TopStreams = lazy(() => import('./components/TopStreams/TopStreams'));
const Live = lazy(() => import('./components/Live/Live'));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Spinner />}>
          <Header />
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Games} />
            <Route exact path="/top-streams" component={TopStreams} />
            <Route exact path="/stream/:slug" component={Live} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
