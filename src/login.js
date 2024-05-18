import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/authslice";
import {useNavigate} from "react-router-dom";
import checkGuest from "./components/auth/checkguest";

function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function attemptLogin() {
        axios.post('https://medicalstore.mashupstack.com/api/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user));
    navigate("/blog/posts");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    return <div>
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-10">
                    <div className="card" style={{ width:'70vh' }}>
                        <div className="card-body">
                            <h1 className="text-center">Login</h1>
                            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="text"
                                    className="form-control"
                                    value={email}
                                    onInput={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password"
                                    className="form-control"
                                    value={password}
                                    onInput={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="form-group" >
                                <button className="btn btn-primary btn-block" onClick={attemptLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
    

export default Login;