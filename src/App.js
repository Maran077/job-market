import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

import LoginForm from './Login'
import Home from './Home'
import Job from './Job'
import JobDetail from './JobDetail'
// import Cart from './Cart'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'

//   <ProtectedRoute exact path="/cart" component={Cart} />

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Job} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetail} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
