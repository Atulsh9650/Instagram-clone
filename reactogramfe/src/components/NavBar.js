import React, { useState } from "react";
import "../css/nabar.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.PNG";
import { IoSearch } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginfailed } from "../redux/userReducer";
import { loggedinActions } from "../redux/loggedinSlice";

function NavBar() {
const logstatus=useSelector(store => store.logstatus);
const currloginstatus=logstatus.isloggedin; 


const dispatch =useDispatch();
const navigate=useNavigate();

const user=useSelector(store=> store.user);
if(localStorage.getItem('token')){
    dispatch(loggedinActions.marklogdone());
}


const logout =()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(loggedinActions.marklogout());
  dispatch(loginfailed());
  navigate('/login');
}

return (
  <nav className="navbar bg-body-light shadow">
      <div className="container-fluid ">
          <a className="navbar-brand">
              <img alt="logo" height={"45px"} src={logo} />
          </a>
          <div className="searachiac">
              <form className="d-flex " role="search">
                  <input
                      className="form-control searchinput shadow"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                  />
                  <button className="searchbutton" type="submit">
                      <IoSearch />
                  </button>
                  <div className="navlinks">
                      <Link className="nav-link" to="/posts">
                          <IoMdHome size={24} />
                      </Link>
                      {currloginstatus &&
                          (<Link className="nav-link" to="/posts">
                              <FaHeart size={22} />
                          </Link>)}
                      <div className="dropdown m-0">
                          {currloginstatus &&
                              (<> <button className="btn p-0" type="button" data-bs-toggle="dropdown">
                                  <img
                                      alt="profile-pic"
                                      className="loggedprofile"
                                      src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
                                  />
                              </button>

                                  <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                          <a className="dropdown-item" href="#">
                                              <Link className="nav-link" to="/profile">
                                                  Profile
                                              </Link>
                                          </a>
                                      </li>
                                      <li>
                                          <a className="dropdown-item" href="#" onClick={() => logout()}>
                                              Log Out
                                          </a>
                                      </li>
                                  </ul>
                              </>) }
                      </div>
                  </div>
              </form>
          </div>
          <div className="collapsemenubar">
              <form className="d-flex " role="search">
                  <button className="searchbutton" type="submit">
                      <IoSearch size={23} />
                  </button>
                  <div className="navlinks">
                      <Link className="nav-link" to="/posts">
                          <IoMdHome size={24} />
                      </Link>
                      {currloginstatus && <Link className="nav-link" to="/posts">
                          <FaHeart size={22} />
                      </Link> }
                      {currloginstatus && <> <div className="dropdown">
                          <button className="btn p-0" type="button" data-bs-toggle="dropdown">
                              <img
                                  alt="profile-pic"
                                  className="loggedprofile"
                                  src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
                              />
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                  <a className="dropdown-item" href="#">
                                      <Link className="nav-link" to="/profile">
                                          Profile
                                      </Link>
                                  </a>
                              </li>
                              <li>
                                  <a className="dropdown-item" onClick={() => logout()} href="#">
                                      Log Out
                                  </a>
                              </li>
                          </ul>
                      </div>
                      </> }
                  </div>
              </form>
          </div>
      </div>
  </nav>
);
}


export default NavBar;
