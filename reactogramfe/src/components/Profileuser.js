import React, { useState,useEffect } from "react";
import "../css/profile.css";
import Modal from "react-bootstrap/Modal";
import { FaLocationDot } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Userpost from "./Userpost";

function Profileuser() {

const [myposts,setmyposts]=useState([]); 
 const navigate=useNavigate();
 const [Loading,setLoading]=useState(false);
 const [image,setimage] =useState({preview: '',data:''});
 const user=useSelector(store=>store.user);
 const userdata=user.userdata;


 const userDataString = localStorage.getItem('user');
 const localuserData = JSON.parse(userDataString);


  const [caption,setcaption]=useState("");
  const [location,setlocation]=useState("");

  const [showPost, setShowPost] = useState(false);

  const handleClosePost = () => setShowPost(false);
  const handleShowPost = () => setShowPost(true);

  const CONFIG_OBJ={
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem('token')
    }
  }
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    }
    setimage(img);
  }

  const handleimgupload=async ()=>{
    let formdata=new FormData();
    formdata.append('file',image.data);

    const response=axios.post(`${API_BASE_URL}/uploadfile`,formdata);
    return response;
  }

  const getMyPosts=async()=>{
    const response=await axios.get(`${API_BASE_URL}/myallposts`,CONFIG_OBJ);
    if(response.status===200){
      setmyposts(response.data.posts);
    }else{
     Swal.fire({
       icon:'error',
       title:'some error occured'
     })
    }
  }
  useEffect(()=>{
    getMyPosts();
  },[]);

  const deletePost=async(postId)=>{
    const response=await axios.delete(`${API_BASE_URL}/deletepost/${postId}`,CONFIG_OBJ);
    if(response.status===200){
      getMyPosts();
    }
  }

  const addPost=async()=>{
    setLoading(true);
    if(image.preview === ''){
      Swal.fire({
        icon:'error',
        title:'Select an Image'
      })
    }else if(caption === ''){
      Swal.fire({
        icon:'error',
        title:'Caption is mandatory'
      })
    }else if(location === ''){
      Swal.fire({
        icon:'error',
        title:'location is mandatory'
      })
    }else{
    const imgRes=await handleimgupload();
    const request={description:caption ,
      location:location,
      image:`${API_BASE_URL}/files/${imgRes.data.filename}`
    }
    const postResponse=await axios.post(`${API_BASE_URL}/createpost`,request,CONFIG_OBJ);
    setLoading(false);
    if(postResponse.status==201){
      getMyPosts();
      navigate("/posts");
    }else{
      Swal.fire({
        icon:'error',
        title:'Some error occured while creating post'
      })
    }
  }
}
  return (
    <div className="profilecontainer shadow mt-2 p-4">
      <div className="row">
        <div className="col-md-6 col-sm-6 col-6 d-flex flex-column">
          <img
            alt="profile_image"
            className="profileimage p-1"
            src="https://images.unsplash.com/photo-1489674267075-cee793167910?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyfGVufDB8fDB8fHww"
          />
          <p className="profileusername fw-bold mb-0">{localuserData.fullname}</p>
          <p className="profileusername mb-0">{localuserData.fullname}</p>
          <p className="profilebio mb-0">Software developer | Follow @<a target="_blank" href="https://www.instagram.com/atul___sharma9650/">{localuserData.fullname}</a></p>
        </div>
        <div className="col-md-6 col-sm-6 col-6 d-flex flex-column justify-content-between">
          <div className="profileaboutinfo d-flex justify-content-center">
            <span className="profiletposts d-flex flex-column align-items-center border-end pe-2">
              <span>{myposts.length}</span>
              <span>Posts</span>
            </span>
            <span className="profilefollowers d-flex flex-column align-items-center border-end pe-2">
              <span>20</span>
              <span>Followers</span>
            </span>
            <span className="profilefollowing d-flex flex-column align-items-center ">
              <span>20</span>
              <span>Following</span>
            </span>
          </div>

          <div className="profileedit d-flex justify-content-center ">
            <button className="btn btn-light me-2  editbutton">
              Edit Profile
            </button>
            <button className="btn btn-light uploadbutton" onClick={handleShowPost}>Upload Post</button>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <hr />
        </div>
      </div>
      <div className="images-container">
      {myposts.map((post)=>(
        <Userpost key={post._id} post={post} deletePost={deletePost}/>  
      ))}
      </div> 
      <Modal show={showPost} size="lg" onHide={handleClosePost} centered>
        <Modal.Header closeButton>
        <span className="fw-bold">Upload Post</span>
        </Modal.Header>
        <Modal.Body>
           <div className="row">
             <div className="col-lg-6 col-md--12 d-flex justify-content-center">
                <div className="upload-box">
                <div className="dropZoneContainer">
                <IoCloudUploadOutline size={35}/>
                <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif,.jpeg" onChange={handleFileSelect} />
                <div className="dropZoneOverlay">
                {image.preview && <img src={image.preview} className="imagepreview" />}
                <br/>
                Upload Photo From Computer</div>
                </div>
                </div>
             </div>
             <div className="col-lg-6 col-md-12">
              <div className="row">
             <div className="form-floating mt-3 mb-3">
             <textarea className="form-control" value={caption} onChange={(e)=>setcaption(e.target.value)} id="floatingTextarea" style={{height: "100px"}}></textarea>
             <label for="floatingTextarea" className="fw-bold ms-2">Add Caption</label>
             </div>
             

             <div className="form-floating mb-3">
             <input type="text" className="form-control" value={location} onChange={(e)=>setlocation(e.target.value)} id="floatingInput" />
             <label for="floatingInput" className="ms-2"><FaLocationDot size ={22} className="me-2"/><span className="fw-bold">Add Location</span></label>
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

            <div className="d-flex justify-content-end">
               <button className="postbtn" onClick={()=>addPost()}>Post</button>
            </div>
            </div>
             </div>
           </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profileuser;
