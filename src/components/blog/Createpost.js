import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkauth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Createpost() {
    var user = useSelector(store => store.auth.user);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [date, setDate] = useState('');
    var navigate = useNavigate();

    function addMedicine() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: date
        }, {
            headers: { 'Authorization': "Bearer " + user.token }
        }).then(response => {
            navigate('/blog/posts');
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                            <Link to={'/blog/posts'} className="btn btn-primary float-right">BACK</Link>
                                <h1 className="text-center mb-4">Create Medicine</h1>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={company}
                                        onChange={(event) => setCompany(event.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                    />
                                </div>
                                <div className="form-group text-center">
                                    <button className="btn btn-primary" onClick={addMedicine}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(Createpost);
