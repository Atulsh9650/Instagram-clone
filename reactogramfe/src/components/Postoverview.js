import Card from "./Card";
import '../css/postoverview.css';
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import axios from 'axios';
import Swal from 'sweetalert2';

function Postoverview() {
  
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('token')
    }
  };

  const [allPosts, setAllPosts] = useState([]);

  const getallposts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allposts`);
      if (response.status === 200) {
        setAllPosts(response.data.posts);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred'
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getallposts();
  }, []);
 
    return (
        <div className="card-container">
         {allPosts.map((post)=>{
           return (
              <Card  key={post._id}
              post={post}
              getallposts={getallposts}
              CONFIG_OBJ={CONFIG_OBJ}/>
           )
         })}
        </div>
      );
}

export default Postoverview;