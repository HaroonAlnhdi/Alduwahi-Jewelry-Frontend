import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Address from "../Address/Address";

import "./Profile.css";
import * as profileService from "../../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();

  const fetchProfile = async () => {
    try {
      const profileData = await profileService.index(userId);
      setProfile(profileData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (userId, formData) => {
    await profileService.update(userId, formData);
    fetchProfile();
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateProfile(userId, profile);
  };

  if (!profile) {
    return (
      <main
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </main>
    );
  }

  return (
    <div className="container">
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img src={ "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="User Avatar" />
                  </div>
                  {profile.user.fullName && <h5 className="user-name">{profile.user.fullName}</h5>}
                  {profile.user.email && <h6 className="user-email">{profile.user.email}</h6>}
                </div>
                <div className="about">
                  <h5>About</h5>
                  {profile.user.bio ? (
                    <p>{profile.user.bio}</p>
                  ) : (
                    <p>No bio available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  {profile.user.firstName && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="fullName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          defaultValue={profile.user.firstName}
                          name="firstName"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  
                  {profile.user.email && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          defaultValue={profile.user.email}
                          name="email"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  {profile.user.phoneNumber && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          defaultValue={profile.user.phoneNumber}
                          name="phone"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )} {profile.user.lastName && (
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label htmlFor="fullName">last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          defaultValue={profile.user.lastName}
                          name="lastName"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="row gutters mt-4">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right ms-4">
                      <button type="button" className="btn btn-secondary">
                        Cancel
                      </button>
                      <button type="submit" 
                     
                      className="btn btn-primary ms-4">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div>
                <Address />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
