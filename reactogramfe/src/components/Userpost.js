import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { IoIosMore } from "react-icons/io";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import '../css/postcard.css';


function Userpost({post,deletePost}) {
    const [show, setShow] = useState(false);
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="card profile_image"
        onClick={handleShow}
        style={{ width: "14rem" }}
      >
        <img
          width={"100%"}
          height={"170px"}
          src={post.image}
          className="card-img-top"
          alt={post.description}
        />
      </div>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div>
                <Carousel fade>
                  <Carousel.Item>
                    <img
                      src={post.image}
                      alt={post.description}
                      className="d-block w-100"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      src="https://images.unsplash.com/photo-1502236876560-243e78f715f7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZyZWUlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
                      alt="carouselimage"
                      className="d-block w-100"
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row mt-2">
                <div className="col-6 d-flex">
                  <img
                    alt="p-2 profile-pic"
                    className="profile-pic me-1"
                    src="https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
                  />
                  <div>
                    <p className="fs-6 fw-bold">{post.author.fullname}</p>
                    <p className="text-muted location">{post.location}</p>
                  </div>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <IoIosMore size={22} />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          <span>
                            <FaRegEdit size={22} />
                          </span>
                          <span className="float-end">Edit Post</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span>
                            <MdDeleteOutline size={22} />
                          </span>
                          <span onClick={()=>deletePost(post._id)} className="float-end">Delete Post</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <p className="text-muted posttime">2 hours ago</p>
              </div>
              <div className="row">
                <p className="postinfo">{post.description}</p>
              </div>
              <div className="row mt-1">
                <p className="fw-bold">{post.likes.length} likes</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Userpost;
