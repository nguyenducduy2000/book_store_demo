import LoginForm from '../../Components/LoginForm';
import BackgroundImage from '../../assets/background.png';
import '../../Components/LoginForm/LoginForm.css';
function Register() {
    return (
        <div className="sign-in__wrapper" style={{ backgroundImage: `url(${BackgroundImage})` }}>
            {/* Overlay */}
            <div className="sign-in__backdrop"></div>
            {/* Form */}
            <LoginForm />
            {/* Footer */}
            <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
                Copyright &copy; 2022. All rights reserved.
            </div>
        </div>
    );
}

export default Register;
