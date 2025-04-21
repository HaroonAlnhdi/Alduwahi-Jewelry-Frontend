import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './SigninForm.css';

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const errors = {};
    if (!formData.username) {
      errors.username = 'Username is required.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      updateMessage('Please correct the errors and try again.');
      return;
    }

    try {
      const user = await authService.signin(formData); // AuthService handles signin and returns user

      props.setUser(user);

      // Check if the user is an admin and navigate accordingly
      if (user.isAdmin) {
        navigate('/AdminDashboard'); 
      } else {
        navigate('/'); // Navigate to regular user dashboard
      }
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password } = formData;

  // Check if the form is invalid
  const isFormInvalid = () => {
    return !username || !password;
  };

  return (
    <section>
      <div className="container h-100 mb-5">
        <div className="row h-100">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <div className="mb-4">
                  <img src="/pic/logo.png" height="100" alt="M.Line Boutique Logo" />
                </div>

                <p className="lead">Welecome back! Please enter your details.</p>

              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <h1 className="h2 text-center">Sign in to your account</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <label>Username</label>
                        <input
                          className={`form-control form-control-lg ${formErrors.username ? 'is-invalid' : ''}`}
                          type="text"
                          name="username"
                          value={username}
                          onChange={handleChange}
                          placeholder="Enter your username"
                        />
                        {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                      </div>
                      <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                          className={`form-control form-control-lg ${formErrors.password ? 'is-invalid' : ''}`}
                          type="password"
                          name="password"
                          value={password}
                          onChange={handleChange}
                          placeholder="Enter password"
                        />
                        {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                      </div>
                      <div className="mt-2">
                        <Link to="#">Forgot password?</Link>
                      </div>
                      <div className="text-center mt-3">

                        <button type="submit">Sign In</button>

                      </div>
                      <div className="text-center mt-3">
                        <span className="textLink">
                          <p>
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                          </p>
                        </span>
                      </div>
                    </form>

                    <div className="text-center mt-1">
                      {message && <p className="text-danger">{message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninForm;
