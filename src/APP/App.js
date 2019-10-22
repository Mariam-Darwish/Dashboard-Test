import React, { Component, Suspense, lazy  } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Loader from '../components/loader'
import Theme from '../Helpers/Theme'

const Login = lazy(() => import ('../Pages/Auth/login'));
const Signup = lazy(() => import ('../Pages/Auth/signup'));
const DashRoute = lazy(() => import ('./route'));

class App extends Component {

  state = {
    isAuth: false
  }
  componentDidMount() {
    if(localStorage.getItem('token')) this.setState({isAuth: true})
  }
  logIn = () => {
    this.setState({isAuth: true})
  }
  logOut = () => {
    this.setState({isAuth: false})
  }
 
  render() { 
    console.log(this.state);
    
    const routes = this.state.isAuth 
    ? ( 
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" render={props => <DashRoute {...props} logOut={this.logOut} />} />
        <Route render={() => <div>Page Not Found 404 !</div>}/>
      </Switch>
    )
    : (
      <Switch>
        <Route exact path="/" render={props => <Login {...props} logIn={this.logIn} />} />
        <Route path="/signup" component={Signup} />
        <Route render={() => <div>Page Not Found 404 !</div>}/>
      </Switch>
    );
    return (
    <Suspense fallback={<Loader />}>
      <Theme>
        <Router>
          {routes}
        </Router>
      </Theme>
    </Suspense>
  );
}
}

export default App;