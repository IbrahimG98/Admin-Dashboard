import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./style";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {getPosts} from "../actions/mainlist";


const MainList=()=>{
    const posts = useSelector((state) => state.mainlist);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
      },[dispatch]);

    return !posts.length? <p>No posts to show!</p>:(
        <div style={styles.parent}>
        <Link to="/new"><button className="btn btn-success">Add new user</button></Link>
        <table id="myTable" style={styles.rowSpacing}> 
            <th>Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
            {
        posts.map((item)=>(
            <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.address?.city}</td>
                <td><Link to={`/edit/${item.id}`}><button className="btn btn-info">Edit</button></Link></td> 
                <td><Link to="/"><button className="btn btn-danger">Delete</button></Link></td> 
            </tr>
           

        ))
     }
        </table>
        </div>
    )
};

export default MainList;