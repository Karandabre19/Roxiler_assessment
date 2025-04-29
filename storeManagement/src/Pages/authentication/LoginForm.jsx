import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../Components/Button/Button";
import CustomInput from "../../Components/Input/CustomInput";
import { loginUser } from "../../Redux/Async/AsyncFunction";
import LoginModuleCss from "../../Styles/login.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { role } = useSelector((state) => state.Authentication);

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      
      await dispatch(loginUser(payload)).unwrap();


      if (role === "Admin") {
        navigate("/admin");
        toast.success("Login successful as Admin");
      }
      if (role === "User"){
        navigate("/user");
        toast.success("Login successful as user");
      }
      if (role === "Owner"){
        navigate("/owner");
        toast.success("Login successful as owner");
      }

      console.log("i reached here")
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  
  return (
    <div className={LoginModuleCss.loginPage}>
      <div className={LoginModuleCss.loginDashBoard}>
        <div className={LoginModuleCss.loginForm}>
          <div className={LoginModuleCss.formSection}>
            <div className={LoginModuleCss.formHeading}>
              Welcome, <br />
              Please Login
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                type="email"
                icon={faEnvelope}
                placeholder="Enter your email"
                register={register}
                errors={errors}
                inputName="email"
                validation={{
                  required: "Please enter the email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                }}
              />
              <CustomInput
                type="password"
                icon={faLock}
                placeholder="Enter your password"
                register={register}
                errors={errors}
                inputName="password"
                validation={{
                  required: "Please enter the password",
                }}
              />
              <div className={LoginModuleCss.toRegister}>
                Don't have an account?{" "}
                <Link className="underline text-blue-600" to="/registration">
                  Register
                </Link>
              </div>
              <div className={LoginModuleCss.loginButton}>
                <Button type="submit">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
