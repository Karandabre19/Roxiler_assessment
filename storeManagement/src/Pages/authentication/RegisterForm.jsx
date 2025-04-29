import { faEnvelope, faLocation, faLocationDot, faLock, faMapLocationDot, faPhone, faSignature, faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import CustomInput from "../../Components/Input/CustomInput";
import { registerUser } from "../../Redux/Async/AsyncFunction";
import registerStyleModule from "../../Styles/register.module.scss";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("I am here")

    try {
      dispatch(registerUser(data));
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className={registerStyleModule.registerPage}>
      <div className={registerStyleModule.registrationDashboard}>
        <div className={registerStyleModule.registerForm}>
          <div className={registerStyleModule.formSection}>
            <h2 className={registerStyleModule.formHeading}>
              Welcome,
              <br />
              Please register.
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomInput
                icon={faSignature}
                placeholder="Full Name"
                type="text"
                inputName="name"
                register={register}
                errors={errors}
              />
              <CustomInput
                placeholder="Enter Email"
                icon={faEnvelope}
                type="email"
                inputName="email"
                register={register}
                errors={errors}
                validation={{
                  required: " * Email",
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                }}
              />
              <CustomInput
                icon={faLock}
                placeholder="Enter Password"
                type="password"
                inputName="password"
                register={register}
                errors={errors}
                validation={{
                  required: "Please enter the password",
                  minLength: 4,
                }}
              />
              <CustomInput
                icon={faMapLocationDot}
                placeholder="Please add your personal address"
                type="text"
                inputName="address"
                register={register}
                errors={errors}
              />
              <div className={registerStyleModule.registerAndLoginLink}>
                <Button
                  type="submit"
                  className={registerStyleModule.signupButton}
                >
                  Register
                </Button>
                <p className={registerStyleModule.alreadyAccount}>
                  Already have an account?{" "}
                  <Link className="text-blue-700 underline" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
