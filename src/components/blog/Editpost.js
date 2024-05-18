import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import checkAuth from '../auth/checkauth';
import { useSelector } from 'react-redux';
import ResponseModal from './Responsemodal'; // Import the modal component
import { Link } from 'react-router-dom';

function EditPost() {
  var user = useSelector((store) => store.auth.user);
  var token = user?.token;
  const { postId } = useParams();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [expiry_date, setExpiry_date] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    axios.get('https://medicalstore.mashupstack.com/api/medicine/' + postId, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((response) => {
        setName(response.data.name);
        setCompany(response.data.company);
        setExpiry_date(response.data.expiry_date);
      });
  }, [postId, token]);

  function updatePost() {
    axios
   .post('https://medicalstore.mashupstack.com/api/medicine/' + postId,
        {
          name: name,
          company: company,
          expiry_date: expiry_date
        },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      )
      .then((response) => {
        setResponseMessage(response.data.message);
        handleShowModal();
      });
    // navigate('/blog/posts'); // Moved navigation to modal close
  }

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/blog/posts'); // Navigate after closing modal
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
          <Link to={'/blog/posts'} className="btn btn-primary float-right">BACK</Link>
            <h1 className="text-center">Edit Post</h1>
            <div className="form-group">
              <label style={{ color:'white' }}>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label style={{ color:'white' }}>Company:</label>
              <textarea
                className="form-control"
                value={company}
                onChange={(event) => {
                  setCompany(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label style={{ color:'white' }}>ExpiryDate:</label>
              <input
                type="date"
                className="form-control"
                value={expiry_date}
                onChange={(event) => {
                  setExpiry_date(event.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary float-right btn-success"
                onClick={updatePost}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the ResponseModal component */}
      <ResponseModal
        show={showModal}
        handleClose={handleCloseModal}
        message={responseMessage}
      />
    </div>
  );
}

export default checkAuth(EditPost);