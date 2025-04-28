    import CustomLink from '../../Components/CustomLink/CustomLink'
    import Navbar from '../../Components/Navigation/navbar'
    import LandingModule from "../../Styles/mainLandingPage.module.scss"

    const MainDashboard = () => {
    return (
        <div className={LandingModule.LandingPage}>
        <Navbar className>
        <div className={LandingModule.authenticationButtons}>
            <div className={LandingModule.loginButton}>
                <CustomLink className={LandingModule.loginLinkButton} to="/login">
                Login
                </CustomLink>
            </div>
            <div className={LandingModule.registerButton}>
                <CustomLink
                className={LandingModule.registerLinkButton}
                to="/registration"
                >
                Sign Up
                </CustomLink>
            </div>
            </div>
        </Navbar>
        </div>
    )
    }

    export default MainDashboard
