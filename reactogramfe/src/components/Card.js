import '../css/card.css';
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { CiHeart ,CiShare2 } from "react-icons/ci";
import { FaRegComment,FaHeart } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from "../config";

function Card({post, getallposts, CONFIG_OBJ }) {
   
   const user = useSelector(store => store.user);
   const [commentbox,setcommentbox] =useState(false);
   const [comment,setcomment] =useState("");
   const [liked, setLiked] = useState(false);
 
   const likePost = async (postId) => {
     try {
       const response = await axios.put(`${API_BASE_URL}/like`, { postId }, CONFIG_OBJ);
       if (response.status === 200) {
         setLiked(true);
         getallposts(); // Refresh posts after like
       }
     } catch (error) {
       console.error("Error liking post:", error);
     }
   };
 
   const dislikePost = async (postId) => {
     try {
       const response = await axios.put(`${API_BASE_URL}/unlike`, { postId }, CONFIG_OBJ);
       if (response.status === 200) {
         setLiked(false);
         getallposts(); // Refresh posts after dislike
       }
     } catch (error) {
       console.error("Error disliking post:", error);
     }
   };
 
   const deletePost = async (postId) => {
     try {
       const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
       if (response.status === 200) {
         Swal.fire({
           icon: 'success',
           title: 'Post deleted successfully'
         });
         getallposts(); // Refresh posts after delete
       }
     } catch (error) {
       console.error("Error deleting post:", error);
       Swal.fire({
         icon: 'error',
         title: 'Error',
         text: 'Failed to delete post'
       });
     }
   };
   const submitComment=async(postId)=>{
         setcommentbox(false);
         const request={"postId":postId,"commentText":comment}
         const response = await axios.put(`${API_BASE_URL}/comment`, request, CONFIG_OBJ);
         if (response.status === 200) {
           getallposts(); 
         } 
   }

    return (
        <div>
            <div className="card rounded shadow-sm">
               <div className="card-body px-2">
                  <div className="row card-row">
                    <div className="col-7 d-flex" >
                     <img alt="p-2 profile pic" className="profile-pic" src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D">
                     </img>
                     <div>
                        <p className='authorname'>{post.author.fullname}</p>
                        <p className='text-muted location'>{post.location}</p>
                     </div>
                    </div>
                    
                    {post.author._id === user.userdata._id ?
                   <div className="col-5">
                        <span onClick={()=>deletePost(post._id)} className="float-end" style={{cursor:"pointer"}}><MdOutlineDelete size={24} /></span>
                    </div>
                   :""}
                  </div>


                  <div className='row'>
                   <div className='col-12'>
                     <img className='rounded post-image' alt={post.description} src={post.image} />
                   </div>
                  </div>

                  
                  <div className="row card-row mt-2">
                  <div className="col-6 d-flex flex-column" >
                    <div >
                    {user.userdata._id === post.author._id ? (
                     <span className='likebutton me-2'><CiHeart size={24} /></span>
                 ) : (
                     !liked ? (
                         <span style={{ cursor: "pointer" }} onClick={() => likePost(post._id)} className='likebutton me-2'><CiHeart size={24} /></span>
                     ) : (
                         <span style={{ cursor: "pointer" }} onClick={() => dislikePost(post._id)} className='likebutton me-2'><FaHeart size={24} /></span>
                     )
                 )}
  
                       <span onClick={()=>setcommentbox(true)} style={{cursor:"pointer"}} className='commentbutton me-2'><FaRegComment size={22} /></span>
                       <span className='sharebutton'><CiShare2 size={24}/></span>
                    </div>
                   <div>
                      <p className='text-muted posttime'>2 hours ago</p>
                   </div>
                  </div>
                  <div className="col-6">
                      <p className="float-end fw-bold">{post.likes.length} likes</p>
                  </div>
                </div>
                <div className='row '>
                  <div className='col-12 '><p>{post.description}</p></div>
                </div>
                <hr></hr>
                { commentbox ?
                <div className='row comment-section'>
                  <div className='col-9 '>
                    <textarea onChange={(event)=>setcomment(event.target.value)} className='form-control'></textarea>
                  </div>
                  <div className='col-3 '>
                  <button className='comment-btn' onClick={()=>submitComment(post._id)}><IoSend  size={22}/></button>
                </div>
                </div>
                :""}
                <p className='text-center'>Comments</p>
                {post.comments.map((comment) => {
                  return (
                    <div className='commentsdiv' key={comment._id}>
                        <span className='commented-by'>{comment.commentBy.fullname}</span>  
                        <span>{comment.commentText}</span> 
                    </div>
                  );

                })}
                
               </div>
            </div>
        </div>
      );
}

export default Card;