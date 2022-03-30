import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./style";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/mainlist";
import Modal from "react-modal";

const MainList = () => {
  let posts = useSelector((state) => state.mainlist);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [yes, setYes] = useState(false);
  const [itemSelected, setItemSelected] = useState();

  const handleYes = () => {
    setYes(true);
    handleShow();
  };
  const handleNo = () => setShow(false);

  const handleShow = (itemid) => {
    setItemSelected(itemid);
    setShow(!show);
  };

  const handleDelete = (id) => {
    if (id) {
      if (id > 10) {
        localStorage.removeItem("DataPostedEdited");
      } else {
        posts = posts.filter((e) => e.id != id);
      }
      setShow(!show);
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, posts]);

  return !posts.length ? (
    <p>No posts to show!</p>
  ) : (
    <div style={styles.parent}>
      <Link to="/new">
        <button className="btn btn-success">Add new user</button>
      </Link>
      <table id="myTable" style={styles.rowSpacing}>
        <th>Id</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>City</th>
        <th>Edit</th>
        <th>Delete</th>
        {posts.map((item) => (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.address?.city}</td>
            <td>
              <Link to={`/edit/${item.id}`}>
                <button className="btn btn-info">Edit</button>
              </Link>
            </td>
            <td>
              <button
                onClick={() => {
                  handleShow(item.id);
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
      <Modal isOpen={show}>
        <div style={styles.content}>
          <p>Are you sure you want to delete this data!</p>
          <button className="btn btn-info" onClick={() => handleNo()}>
            No
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handleDelete(itemSelected);
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MainList;
