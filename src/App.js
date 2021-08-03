import React, {Fragment} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddIncident from './components/AddIncident';
import IncidentsList from './components/IncidentsList';

function App(){
  return (
    <Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <Link to={"/incidents"} className="navbar-brand">
          Home
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/incidents"} className="nav-link">
              Incidentes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Lista de Incidencias</h2>
        <Switch>
          <Route exact path={["/", "/incidents"]} components={IncidentsList}>
            <IncidentsList></IncidentsList>
          </Route>
          <Route exact path="/add" components={AddIncident}>
            <AddIncident/>
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;