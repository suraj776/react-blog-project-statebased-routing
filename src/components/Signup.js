import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./ui/Input";

function findEmail(users,value){
    let userData= users.filter((user)=>{
       return user.email==value;
     });
     return userData;
 }
  // Adding the custom validator to yup
const schema = yup.object().shape({
    name: yup.string().required('First Name is required'),
    email: yup.string().email('Invalid email').required('Email is required')
  });
const Signup = (props) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    let users=[];
    let userMatched=[];
    users=localStorage.getItem('users')?JSON.parse(localStorage.getItem('users')):[];
     userMatched=findEmail(users,data.email);
    if(userMatched?.length===0){
      data={...data,new:1};
      users.push(data);
      localStorage.setItem('users',JSON.stringify(users));
      props.setIsLoggedIn(true);
      props.setShowSignup(false);
      props.setLoggedInUser(data);
      props.setShowForm(true);
      localStorage.setItem("loginDetail", JSON.stringify(data));
    }else{
      props.setIsLoggedIn(true);
      props.setShowSignup(false);
      props.setLoggedInUser(userMatched[0]);
      localStorage.setItem("loginDetail", JSON.stringify(userMatched[0]));
    }
    reset();
  }
  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-poster">
          <img
            className=""
            src={process.env.PUBLIC_URL + "/images/blog-poster.jpg"}
          />
        </div>
        <div className="signup-form-section">
          <div class="card signup-card">
            <div className="signup-card-header">
              <span>SignUp</span>
            </div>
            <div class="card-body signup-card-body">
              <form onSubmit={handleSubmit(onSubmitHandler)} className="signup-form">
                <div class="form-row">
                  <div class="form-group col-md">
                    <Input
                      type="text"
                      label="Name"
                      name="name"
                      control={register}
                      errors={errors}
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md">
                    <Input
                      type="email"
                      label="Email"
                      name="email"
                      control={register}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className='form-footer'>
                <button className="btn header-button" type="submit">
                  SignUp
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
