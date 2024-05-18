import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostListItem(props) {
    const user = useSelector(store => store.auth.user);
    const [showModal, setShowModal] = useState(false);

    function deletePost() {
        axios
            .delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            .then(response => {
                // alert(response.data.message);
                props.refresh();
                setShowModal(false);
            })
            .catch(error => {
                console.error('Error deleting post:', error);
                // Handle error if needed
                setShowModal(false);
            });
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className='card-title'>{props.post.name}</h5>
                <div className='d-flex justify-content-end'>
                <button className="btn btn-danger mr-2" onClick={() => setShowModal(true)}>
                    Delete
                </button>
                <Link to={`/blog/posts/${props.post.id}/edit`} className="btn btn-primary mr-2">
                    Edit
                </Link>
                <Link to={`/blog/posts/${props.post.id}`} className="btn btn-info mr-2">
                    View
                </Link>

                {/* Delete Confirmation Modal */}
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this post?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={deletePost}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )}
            </div>
        </div>
        </div>
    );
}

export default PostListItem