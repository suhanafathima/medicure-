import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";


function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }
        axios.post('https://medicalstore.mashupstack.com/api/register',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }
    return ( 
         <div className="bg">
 
      <div className="container mt-5">
          <div className="">
              <div className="col-md-6">
                  <div className="card float-left "   style={{ width:'70vh' }}>
                      <div className="card-body">
                          <h1 className="text-center">Register</h1>
                          {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                          <div className="form-group">
                              <label>Name:</label>
                              <input type="text"
                                  className="form-control"
                                  value={name}
                                  onInput={(event) => setName(event.target.value)}
                              />
                          </div>
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
                          <div className="form-group">
                              <label>Confirm Password:</label>
                              <input type="password"
                                  className="form-control"
                                  value={passwordConf}
                                  onInput={(event) => setPasswordConf(event.target.value)}
                              />
                          </div>
                          <div className="form-group text-center">
                              <button className="btn btn-primary" onClick={registerUser}>Submit</button>
                          </div>
                          <div className="text-center">
                              <p>Already have an account? <Link to={'/login'}>login here</Link></p>
                             
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </div>
    );  
  }
  

export default Register;