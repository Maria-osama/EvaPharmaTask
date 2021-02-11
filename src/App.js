import { Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/login/login';
import Countries from './components/countries/countries';
import Cities from './components/cities/cities'



function App() {
  return (
    <div className="App container">
     <Switch>
       <Route exact path="/" component={Login}/>
       <Route exact path="/countries" component={Countries}/>
       <Route exact path="/countries/:id" component={Cities}/>
     </Switch>
    </div>
  );
}

export default App;
