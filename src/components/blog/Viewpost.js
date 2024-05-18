import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkauth";
import { Link } from "react-router-dom";


function ViewPost() {
    var user = useSelector(store => store.auth.user);
    var { postId } = useParams();
    var [post, setPost] = useState({ name: '', company: '', expiry_date: '' });

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        }).then(response => {
            const formattedDate = new Date(response.data.date).toLocaleDateString();
            setPost({ ...response.data, date: formattedDate });
        }).catch(error => {
            console.error(error);
        });
    }, [postId, user.token]);

    return (
        <div>
            <Navbar />
           
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <Link to={'/blog/posts'} className="btn btn-primary float-right">BACK</Link>
                        <div className="card text-center mt-5 ml-5 mb-5 " style={{ backgroundColor: "lightblue"}}>
                            <div className="card-header"><h3>{post.name}</h3></div>
                            <div className="card-body">{post.company}</div>
                            <div className="card-footer">{post.expiry_date}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ViewPost);
