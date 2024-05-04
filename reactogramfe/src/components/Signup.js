import { useState } from 'react';
import '../css/signup.css';
import socialdesktop from "../images/social-desktop.PNG";
import socialmobile from "../images/social-mobile.PNG";
import { Link } from 'react-router-dom';
import  axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';

function Signup() {

const [phone,setphone]=useState("");
const [fullname,setfullname] =useState("");
const [email,setemail] =useState("");
const [password,setpassword] =useState("");

const [Loading,setLoading]=useState(false);

 const signup=(event)=>{
     event.preventDefault();
     setLoading(true);
     const requestData={fullname:fullname,email,password};
     axios.post(`${API_BASE_URL}/signup`,requestData)
     .then((result)=>{
       if(result.status == 201){
        setLoading(false);
        setfullname("");
        setemail("");
        setpassword("");
        setphone("");
        Swal.fire({
          icon:'success',
          title:'user successfully registered'
        })
       }
     })
     .catch((error)=>{
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon:'error',
        title:'some error occured'
      })
     })

 }

    return (
        <div className="signupcontainer">
        <div className="row">
          <div className="col-md-7 col-sm-12 logoimagecontainer">
            <img className='socialdesktop'
              height={"90%"}
              width={"70%"}
              src={socialdesktop}
              alt="Social Desktop"
            />
            <img className='socailmobile' height={"250px"} width={"250px"} src={socialmobile} alt='socail mobile' />
          </div>
          <div className="col-md-5 col-sm-12 shadow signupininputcontainer">
            <div className="card w-100 border-0"> 
              <div className="card-body p-3">
                <h4 className="card-title fw-bolder mb-4 text-center">Sign Up</h4>
                <form onSubmit={(e)=>signup(e)}>
                <div className="mb-3 ">
                <input type="tel" className="form-control p-2" value={phone} onChange={(e)=>setphone(e.target.value)} placeholder="Phone" />
              </div>
                <div className="mb-3 ">
                  <input type="email" className="form-control p-2" placeholder="Email" value={email} onChange={(event)=>setemail(event.target.value)}/>
                </div>
                <div className="mb-3 ">
                <input type="text" className="form-control p-2" value={fullname} onChange={(e)=>setfullname(e.target.value)} placeholder="Full Name" />
              </div>
                <div className="mb-3">
                  <input type="password" className="form-control p-2" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Password" />
                </div>
                {Loading ? (
                  <div className='row'>
                  <div className='col-12 text-center m-2'>
                  <div className="spinner-border text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>
                  </div>
                  </div>
                ) :('')}
                <div>
                  <button type="submit" className="btn btn-primary custom-btn w-100 fw-bold">Sign Up</button>     
                </div>
                
                <div className='my-4'>
                <hr className='text-muted' />
                <h5 className='text-muted text-center'>OR</h5>
                <hr className='text-muted'/>
                </div>
                <div className='mt-3 mb-5 d-grid'>
                <button className="custom-btn-white custom-btn w-100 border-1">
                <span className='text-muted fs-6'>Already have an account?</span>
                <Link to="/login" className='ms-1 text-info fw-bold'>Log In</Link>
                </button>
                </div>
                </form> 
              </div>
            </div>
          </div>
        </div>
      </div>

      );
}

export default Signup;