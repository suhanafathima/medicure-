import { createBrowserRouter } from "react-router-dom";
import Register from "./App";

import ListPosts from "./components/blog/Listpost";
import CreatePost from "./components/blog/Createpost";
import Login from "./login";
import ViewPost from "./components/blog/Viewpost";
import EditPost from "./components/blog/Editpost";


const router = createBrowserRouter([
    { path: '', element: <Register/> },
    { path : 'blog/posts' , element:<ListPosts/> },
    { path:'blog/posts/create',element:<CreatePost/>},
    { path:'login', element:<Login/>},
    { path: 'blog/posts/:postId', element: <ViewPost/>},
    { path : '/blog/posts/:postId/edit', element: <EditPost/>}
   
]);

export default router;