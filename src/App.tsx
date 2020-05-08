import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Spinner from './components/Spinner/Spinner';

const Header = lazy(() => import('./components/Header/Header'));
const Sidebar = lazy(() => import('./components/Sidebar/Sidebar'));
const Games = lazy(() => import('./components/Games/Games'));
const TopStreams = lazy(() => import('./components/TopStreams/TopStreams'));
const Live = lazy(() => import('./components/Live/Live'));
const GameStreams = lazy(() => import('./components/GameStreams/GameStreams'));
const SearchResults = lazy(() => import('./components/SearchResults/SearchResults'));
const Error = lazy(() => import('./components/Error/Error'));

const App = ()  => (
  <div className="App">
    <Router>
      <Suspense fallback={<Spinner />}>
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Games} />
          <Route exact path="/top-streams" component={TopStreams} />
          <Route exact path="/stream/:slug" component={Live} />
          <Route exact path="/game/:gameName" component={GameStreams} />
          <Route exact path="/search/:query" component={SearchResults} />
          <Route exact path="/search/" component={Error} />
        </Switch>
      </Suspense>
    </Router>
  </div>
);

export default App;
