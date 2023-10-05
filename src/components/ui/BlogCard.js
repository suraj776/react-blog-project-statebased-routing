import { useEffect, useState } from "react";
import { findUserByEmail } from "../Helpers/helpers";
import { capitalizeFirstLetter, decodeHtmlEntities } from "../Helpers/helpers";
import CommentBox from "./CommentBox";
const BlogCard = (props) => {
  let blog = { ...props.blog };
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [replyToggle,setReplyToggle]=useState(false);

  const handleReplyToggle = (commentId) => {
    setReplyToggle((prevToggles) => ({
      ...prevToggles,
      [commentId]: !prevToggles[commentId],
    }));
  };

  useEffect(() => {
    setComments(blog.comment);
  }, []);

  const handleCommentAdd = (blogId,comment) => {
    let maxId = comments.reduce((max, comment) => (comment.id > max ? comment.id : max), 0);
    maxId=maxId+1;
    const updatedComments = [...comments, { id:maxId,comment:comment,reply:[]}];
    setComments(updatedComments);
    console.log(updatedComments);
    props.handleComment(blogId, updatedComments);
    setToggle(false);
  };

  const handleReplyAdd = (commentId,reply,blogId) => {
    let oldComments=[];
    let updatedComments=[];
    oldComments = [...comments];
    updatedComments= oldComments.map((comment)=>{
      if(comment.id==commentId){
        comment.reply=[...comment.reply,reply];
        return comment;
      }else{
        return comment
      }
    })
    setComments(updatedComments);
    props.handleComment(blogId, updatedComments);
    setReplyToggle(false);
  };
  
  return (
    <div className="card blog-card mt-5" key={props.key}>
      <div className="card-body">
        <div className="card-blog-header">
          <div className="user-profile">
            <div className="user-profile-img">
              <img
                src={process.env.PUBLIC_URL + "/images/profile.jpg"}
                alt="user-profile"
              ></img>
            </div>
            <div className="user-profile-detail">
              <h5 className="card-title">{props.username}</h5>
            </div>
          </div>
          <div className="card-actions">
         
            {/* 
                We can use it to for update and delete UI.

              {blog.email == props.email && (
              <>
                <i class="fa fa-trash" aria-hidden="true"></i>
                <i class="fa fa-edit"></i>
              </>
            )} */}
          </div>
        </div>
        <h2 className="card-subtitle mb-2 text-muted">
          {capitalizeFirstLetter(blog.title)}
        </h2>
        <div className="blog-content"dangerouslySetInnerHTML={{ __html: blog.content }}/>
        <div className="card-blog-collaboration">
        <a href="#" className="card-link" onClick={props.handleLikeClick}>
          <span>
            <i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;
            <span>{blog.like}</span> {blog.like > 1 ? `Likes` : `Like`}
          </span>
        </a>
        <a
          href="#"
          onClick={(e) => {
            
            if(toggle){
              setToggle(false)

            }else{
              setToggle(true)
            }
          }}
          className="card-link"
        >
            <i class="fa fa-comment" aria-hidden="true"></i>&nbsp;&nbsp; {comments?.length} &nbsp;
          {
            comments.length>0?`comments`:'comment'
          }
        </a>

        </div>

        <div className="card-blog-comment-section">
          <div className="card-blog-comment-section-header">
            <span>Comments</span>
          </div>
          {toggle && (
          <CommentBox sourceId={blog.id} onCommentAdd={handleCommentAdd} placeholder="Add comment..."/>
        )}
          {comments?.map((comment, index) => (
            <>
            <div key={index} className="card-blog-comment">
              {comment.comment}
              
            </div>
            <a key={index} href="#" className="card-blog-reply-button" onClick={() => handleReplyToggle(comment.id)}> <i class="fa fa-reply" aria-hidden="true"></i></a>
            {replyToggle[comment.id] && (
              <CommentBox blogId={blog.id} sourceId={comment.id} onCommentAdd={handleReplyAdd} placeholder="Add reply..."/>
            )}
         
              {
                comment.reply?.map((reply,index)=>(
                  <div key={comment.id.index} className="card-blog-reply">
                    {reply}
                  </div>
                ))
              }
           
          </>
                                 
          ))}
  
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
