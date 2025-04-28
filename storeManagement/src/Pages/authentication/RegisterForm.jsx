import { faEnvelope, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomInput from "../";
import Button from "src/Components/button/Button";
import Navbar from "src/Components/navbar/Navbar";
import { registerUser } from "src/redux/Slices/async/AsyncFunction";
import registerStyleModule from "src/styles/register.module.scss";

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);

  const password = watch("user_password");

  const onSubmit = (data) => {
    console.log("I am here")
    const payload = {
      last_name: data.last_name,
      first_name: data.first_name,
      email: data.email,
      user_password: data.user_password,
      mobile_number: data.mobile_number,
    };

    try {
      dispatch(registerUser(payload));
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className={registerStyleModule.registerPage}>
      <Navbar />
      <div className={registerStyleModule.registrationDashboard}>
        <div className={registerStyleModule.registerForm}>
          <div className={registerStyleModule.formSection}>
            <h2 className={registerStyleModule.formHeading}>
              Welcome,
              <br />
              Please register.
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={registerStyleModule.name}>
                <CustomsInput
                  placeholder="First name"
                  type="text"
                  inputName="first_name"
                  register={register}
                  errors={errors}
                  validation={{
                    required: "* First name",
                    maxLength: 8,
                    pattern: /^[A-Za-z ]{1,7}$/,
                  }}
                />
                <CustomInput
                  placeholder="Last name"
                  type="text"
                  inputName="last_name"
                  register={register}
                  errors={errors}
                  validation={{
                    required: "* last name",
                    maxLength: 8,
                    pattern: /^[A-Za-z ]{1,7}$/,
                  }}
                />
              </div>
              <CustomInput
                icon={faEnvelope}
                placeholder="Email"
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
                placeholder="Enter phone number"
                icon={faPhone}
                type="text"
                inputName="mobile_number"
                register={register}
                errors={errors}
                validation={{
                  required: "* Phone number",
                  pattern: /^\d{10}$/,
                }}
              />
              <CustomInput
                icon={faLock}
                placeholder="Password"
                type="password"
                inputName="user_password"
                register={register}
                errors={errors}
                validation={{
                  required: "Please enter the password",
                  minLength: 4,
                }}
              />
              <CustomInput
                icon={faLock}
                placeholder="Confirm Password"
                type="password"
                inputName="confirm_password"
                register={register}
                errors={errors}
                validation={{
                  required: "Please confirm password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
              />
              <div className={registerStyleModule.registerAndLoginLink}>
                <Button
                  type="submit"
                  className={registerStyleModule.signupButton}
                >
                  {loading ? "Registering..." : "Register"}
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
