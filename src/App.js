import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import AddOrUpdateUser from './components/AddOrUpdateUser'
import DisplayAllUsers from './components/DisplayAllUsers'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate to="/api/customers" />}
          ></Route>
          <Route exact path="/create" element={<AddOrUpdateUser />}></Route>
          <Route
            exact
            path="/api/customers"
            element={<DisplayAllUsers />}
          ></Route>
          <Route
            exact
            path="/api/customers/:id"
            element={<AddOrUpdateUser />}
          ></Route>
        </Routes>
      </div>
    </Router>
  )
}
export default App
