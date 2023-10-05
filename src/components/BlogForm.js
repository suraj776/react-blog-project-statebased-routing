import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./ui/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextEditor from "./ui/TextEditor";
import { UpdateUserField } from "./Helpers/helpers";
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});
const BlogForm = (props) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);
  const onSubmitHandler = (data) => {
    const maxId = blogs.reduce(
      (max, blog) => (blog.id > max ? blog.id : max),
      -1
    );

    const newdata = {
      id: maxId,
    incrementAndAddProperty:  ()=> this.id++,
      ...data,
      email: props.user.email,
      like: 0,
      updatelike: function () {
        this.like++;
      },
      comment: [],
      updateComment: function (value) {
        this.comment = [...this.comment, value];
      },
    };
    newdata.incrementAndAddProperty();
    const newBlogs = [...blogs, newdata];
    setBlogs(newBlogs);
    localStorage.setItem("blogs", JSON.stringify(newBlogs));
    // reset();
    if (props.user.new === 1) {
      let users = [];
      users = UpdateUserField(
        JSON.parse(localStorage.getItem("users")),
        props.user.email,
        "new",
        0,
        props.updateLoggedInUserDetail
      );
      localStorage.setItem("users", JSON.stringify(users));
    }
    props.setShowForm(false);
  };
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleEditorChange = (value) => {
    // if(value==''){
    //     setError('content','Content is required');
    // }
    setValue("content", value);
  };
  const handleBackClick = (e) => {
    e.preventDefault();
    props.setShowForm(false);
  };
  return (
    <>
      <div className="blog-form-wrapper">
        <div class="card signup-card blog-form-card">
          <div className="signup-card-header">
            <span>Create Blog</span>
            {!props?.user?.new && (
              <button
                className="btn secondary-button"
                onClick={handleBackClick}
              >
                {" "}
                <i class="fa fa-backward" aria-hidden="true"></i> Back
              </button>
            )}
          </div>
          <div class="card-body signup-card-body">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="blog-form"
            >
              <div class="form-row">
                <div class="form-group col-md">
                  <Input
                    type="text"
                    label="Title"
                    name="title"
                    control={register}
                    errors={errors}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md">
                  <label htmlFor="content">Content:</label>
                  <TextEditor value={""} onChange={handleEditorChange} />
                </div>
              </div>
              <div className="form-footer mt-5">
                <button className="btn header-button" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogForm;
