import '../css/login.css';
import socialdesktop from "../images/social-desktop.PNG";
import socialmobile from "../images/social-mobile.PNG";
import { Link ,useNavigate} from 'react-router-dom';
import  axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginsuccess } from "../redux/userReducer";
import { loggedinActions } from '../redux/loggedinSlice';



function Login() {

const [email,setemail] =useState("");
const [password,setpassword] =useState("");

const [Loading,setLoading]=useState(false);
const dispatch =useDispatch();
const navigate=useNavigate();

 const login=(event)=>{
     event.preventDefault();
     setLoading(true);
     const requestData={email,password};
     axios.post(`${API_BASE_URL}/login`,requestData)
     .then((result)=>{
    
       if(result.status === 200){    
        localStorage.setItem("token",result.data.result.token);
        const userdata=JSON.stringify(result.data.result.user);
        localStorage.setItem('user',userdata);
        dispatch(loginsuccess(result.data.result.user));
        dispatch(loggedinActions.marklogdone());
        setLoading(false);
        setemail("");
        setpassword("");
        Swal.fire({
          icon:'success',
          title:'user logged In successfully'
        })
        navigate('/profile');
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
    <div className="logincontainer">
      <div className="row">
        <div className="col-md-7 logoimagecontainer">
        <img className='socialdesktop'
              height={"90%"}
              width={"70%"}
              src={socialdesktop}
              alt="Social Desktop"
            />
            <img className='socailmobile' height={"250px"} width={"250px"} src={socialmobile} alt='socail mobile' />
        </div>
        <div className="col-md-5 shadow logininputcontainer">
          <div className="card w-100 border-0"> 
            <div className="card-body p-3">
              <h4 className="card-title fw-bolder mb-4 text-center">LOG IN</h4>
              <form onSubmit={(e)=>login(e)}>
              <div className="mb-3 ">
                <input type="email" className="form-control p-2" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Phone number,username or Email" />
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
                <button type="submit" className="btn btn-primary custom-btn w-100 fw-bold">Log In</button>
              </div>
              <div className='my-4'>
              <hr className='text-muted' />
              <h5 className='text-muted text-center'>OR</h5>
              <hr className='text-muted'/>
              </div>
              <div className='mt-3 mb-5 d-grid'>
              <button className="custom-btn-white custom-btn w-100 border-1">
              <span className='text-muted fs-6'>Don't have an account?</span>

              <Link to="/signup" className='ms-1 text-info fw-bold'>Sign Up</Link>
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

export default Login;
