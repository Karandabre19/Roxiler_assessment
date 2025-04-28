    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import clsx from "clsx";
    import PropTypes from "prop-types";
    import inputStyle from "./input.module.scss";

    const CustomInput = ({
    step,
    onChange,
    name,
    inputMainCLassName = "",
    className = "",
    id,
    type,
    icon,
    placeholder,
    register,
    errors,
    inputName,
    validation,
    minLength,
    maxLength,
    mainContainer,
    acceptingTypes,
    alertText="",
    value
    }) => {
    return (
        <div className={clsx(inputStyle.InputMainContainer , mainContainer)}>
        {errors?.[inputName] ? 
            <span className={inputStyle.inputError}>
            {errors?.[inputName].message}
            </span> : <div className={inputStyle.alertTextContainer}>
            <span>{alertText}</span>
            </div>}
        <div className={clsx(inputStyle.inputContainer, inputMainCLassName)}>
            {icon && (
            <label htmlFor={id} className={inputStyle.inputSymbol}>
                <FontAwesomeIcon icon={icon} />
            </label>
            )}
            <input
            type={type}
            id={id}
            name={name}
            step={step}
            className={`${className}`}
            placeholder={placeholder}
            {...(register ? register(inputName, validation) : {})}
            onChange={onChange}
            onClick={onclick}
            min={minLength}
            max={maxLength}
            accept={acceptingTypes}
            value={value}
            />
        </div>
        </div>
    );
    };

    CustomInput.propTypes = {
    step:PropTypes.number,
    inputMainCLassName: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    icon: PropTypes.object,
    placeholder: PropTypes.string,
    register: PropTypes.func,
    errors: PropTypes.object,
    inputName: PropTypes.string.isRequired,
    validation: PropTypes.object,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    mainContainer: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    minLength:PropTypes.string,
    maxLength:PropTypes.string,
    acceptingTypes:PropTypes.string,
    alertText:PropTypes.string,
    value:PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onClick:PropTypes.func
    };

    export default CustomInput;
