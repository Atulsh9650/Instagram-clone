import { useSelector } from "react-redux";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Postoverview from "./components/Postoverview";
import Profileuser from "./components/Profileuser";
import Signup from "./components/Signup";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {

  const logstatus=useSelector(store=>store.logstatus);
  const isloggedin=logstatus.isloggedin;

  return (
    <>
    <Router>
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        {!isloggedin && <Route exact path="/login" element={<Login />} />}
        {!isloggedin && <Route exact path="/signup" element={<Signup />} />}
        <Route exact path="/posts" element={<Postoverview />} />
        <Route exact path="/profile" element={<Profileuser />} />
      </Routes>
    </div>
  </Router>
    </>
  );
}

export default App;
