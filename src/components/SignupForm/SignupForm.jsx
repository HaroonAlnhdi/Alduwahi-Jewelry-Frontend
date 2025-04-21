import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { Link } from 'react-router-dom';
const SignupForm = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation logic
    const errors = {};
    let errorMessage = '';

    if (!formData.username) {
      errors.username = 'Username is required.';
      errorMessage += 'Username is required.\n';
    } else if (formData.username.length > 25) {
      errors.username = 'Username cannot exceed 25 characters.';
      errorMessage += 'Username cannot exceed 25 characters.\n';
    }

    if (!formData.email) {
      errors.email = 'Email is required.';
      errorMessage += 'Email is required.\n';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
      errorMessage += 'Password is required.\n';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
      errorMessage += 'Password must be at least 8 characters long.\n';
    }

    if (!formData.passwordConf) {
      errors.passwordConf = 'Please confirm your password.';
      errorMessage += 'Please confirm your password.\n';
    } else if (formData.password !== formData.passwordConf) {
      errors.passwordConf = 'Passwords do not match.';
      errorMessage += 'Passwords do not match.\n';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      updateMessage(errorMessage.trim());
      return;
    }

    try {
      updateMessage('');
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf, email } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf && password.length >= 8 && username.length <= 25);
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
                <p className="lead">
                  Discover the best in fashion with M.Line Boutique.
                </p>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-4">
                    <h1 className="h2 text-center">Sign Up</h1>
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
                        <label>Email</label>
                        <input
                          className={`form-control form-control-lg ${formErrors.email ? 'is-invalid' : ''}`}
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
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
                      <div className="form-group mb-3">
                        <label>Confirm Password</label>
                        <input
                          className={`form-control form-control-lg ${formErrors.passwordConf ? 'is-invalid' : ''}`}
                          type="password"
                          name="passwordConf"
                          value={passwordConf}
                          onChange={handleChange}
                          placeholder="Confirm password"
                        />
                        {formErrors.passwordConf && <div className="invalid-feedback">{formErrors.passwordConf}</div>}
                      </div>
                      <div className="text-center mt-3">
                        <button type="submit" className='signinBtn'>
                          Sign Up
                        </button>
                      </div>
                      <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/signin">Login</Link></p>
                      </div>
                    </form>
                    
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

export default SignupForm;
