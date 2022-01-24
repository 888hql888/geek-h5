import { BrowserRouter as Router,Route,Redirect,Switch } from 'react-router-dom'
import './App.scss'
import Layout from './pages/Layout'
import Login from '@/pages/Login'
function App() {
  return <div className="app">
    <Router>
      <Switch>
        <Redirect exact from='/' to='/home'></Redirect>
        <Route path={'/home'} component={Layout}></Route>
        <Route path={'/login'} component={Login}></Route>
      </Switch>
    </Router>
  </div>
}

export default App