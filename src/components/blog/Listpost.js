import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from './Deletepost';
import { useSelector } from "react-redux";

function ListPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const user = useSelector((store) => store.auth.user);
  const token = user?.token || "";

  function fetchPosts() {
    axios
      .get("https://medicalstore.mashupstack.com/api/medicine", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setAllPosts(response.data);
        if (searchTerm.trim() !== "") {
          // Filter posts whose names start with the search term's first letter
          const filteredItems = response.data.filter((item) =>
            item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
          );
          setFilteredPosts(filteredItems);
        } else {
          // If search term is empty, show all posts
          setFilteredPosts(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }

  useEffect(() => {
    if (user && user.token) {
      fetchPosts();
    } else {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]); // Refetch posts whenever search term changes

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
          <div className="col-12">
            <h1 className="text-center my-4" style={{ color:'white' }}>Medicines</h1>
          </div>
            <form>
              <label style={{ color:"white" }}>Search Medicine: &nbsp;</label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={fetchPosts}
              >
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
      </div>
      <div className="container">
       
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/blog/posts/create" className="btn btn-info mb-5 mt-4">
              Create Medicine
            </Link>
            {filteredPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredPosts.map((post) => (
                <PostListItem key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPosts;