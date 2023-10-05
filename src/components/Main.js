import { useEffect, useState } from "react";
import { findBlogByEmail, findUserByEmail,findBlogById } from "./Helpers/helpers";
import BlogCard from "./ui/BlogCard";
const handleLikeClick = (blogs, id) => {
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === id) {
        return {
          ...blog,
          like: blog.like + 1
        };
      } else {
        return blog;
      }
    });
  
    return updatedBlogs;
  };
  const handleCommentClick = (blogs,id,newComment)=>{
    const updatedBlogs = blogs.map(blog => {
        if (blog.id === id) {
          return {
            ...blog,
            comment:[...newComment]
            
          };
        } else {
          return blog;
        }
      });
      return updatedBlogs;
}
  
const Main = (props) => {
    // const [users,setUsers]=useState([]);
    const [user,setUser]=useState({});
    const [allBlogs,setAllBlogs]=useState([]);
    const [blogs,setBlogs]=useState([]);

    const handleLike = (id) => {
      let updatedBlogs = handleLikeClick(blogs, id);
      // if(props.onlyUsers){
      updatedBlogs = findBlogByEmail(updatedBlogs,user.email);
      // }    
     setBlogs(updatedBlogs);
  
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    };
  
  const handleComment=(id,newComment)=>{
      let updatedBlogs = handleCommentClick(blogs,id,newComment);
      
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
  }
  useEffect(() => {
    let blogsData=[];
    blogsData=localStorage.getItem('blogs')?JSON.parse(localStorage.getItem('blogs')):[];
    blogsData = blogsData.sort((blog1, blog2) => {
      if (blog1.comment.length < blog2.comment.length ) return 1;
      if (blog1.comment.length  > blog2.comment.length ) return -1;
      return 0;
    });
    setAllBlogs([...blogsData]);
    if(blogsData.length>0){
        
        let userLoginData = JSON.parse(localStorage.getItem('loginDetail'));
        setUser(userLoginData);
        blogsData = findBlogByEmail(blogsData,userLoginData.email);
        setBlogs(blogsData);
    }else{
        setBlogs(blogsData);
    }

  },[]);



  return (
    <>
        <div className="main-blog-wrapper">
        {
            blogs.length > 0 && blogs.map((blog) => {
                let userMatch = findUserByEmail(JSON.parse(localStorage.getItem('users')), blog.email);
                if (userMatch.length > 0) {
                    let username = userMatch[0].name;
                    return <BlogCard key={blog.id} blog={blog} username={username} email={user.email} handleLikeClick={()=>handleLike(blog.id)} handleComment={handleComment}/>;
                }
                return null; // Add this to handle the case when there's no matching user
            })
        }
        </div>
    </>
  );
};
export default Main;
