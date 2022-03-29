import React, { useState, useEffect } from "react";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { Router, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import localJSONData from "../../dataJSON/data.json";
import { getPosts } from "../../API/api";

const Form = ({ currentID, setCurrentID }) => {
  const [postData, setPostData] = useState({
    id:"",
    name: "",
    email: "",
    city: "TestCity",
    username:""
  });
  let params = useParams();
  console.log("JSON data",localJSONData);
  const post = useSelector((state) =>
    params.id ? state.mainlist.find((p) => p.id == params.id) : null
  );
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  const dispatch = useDispatch();
  let navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    postData.username=postData.name;
    while(postData.id<11)
    postData.id=Number(Math.random()*100).toFixed(0);
    localStorage.setItem('DataPostedEdited',JSON.stringify(postData));
    navigate("/");
    console.log(postData);
  };
  return (
    <div style={styles.parent}>
      {params.id ? <p>Editing an existing user</p> : <p>Adding a new user</p>}
      <form style={styles.parent} onSubmit={handleSubmit}>
        <label>Name</label>
        <br></br>
        <input
          required
          type="text"
          value={postData?.name}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        ></input>
        <br></br>
        <label>Email</label>
        <br></br>
        <input
          required
          type="text"
          value={postData?.email}
          onChange={(e) => setPostData({ ...postData, email: e.target.value })}
        ></input>
        <br></br>
        <br></br>
        <Link to="/">
          <button className="btn btn-danger mr-3">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
