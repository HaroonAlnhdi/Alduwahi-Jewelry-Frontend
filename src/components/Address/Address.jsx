import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as profileService from "../../services/profileService";

const Address = () => {
  const { userId } = useParams();

  const [address, setAddress] = useState({
    user_id: userId,
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const fetchAddress = async () => {
    try {
      const addressData = await profileService.index(userId);
      setAddress({
        user_id: userId,
        street: addressData.street || "",
        city: addressData.city || "",
        state: addressData.state || "",
        zip: addressData.zip || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [userId]);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    console.log(address);
  };

  const handleUpdateAddress = async (userId, formData) => {
    const updatedAddress = await profileService.update(userId, formData);
    fetchAddress();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdateAddress(userId, address);
  };

  return (
    <main>
      <h1>Address Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            value={address.street}
            name="street"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={address.city}
            name="city"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={address.state}
            name="state"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip:</label>
          <input
            type="text"
            id="zip"
            value={address.zip}
            name="zip"
            onChange={handleChange}
          />
        </div>
        <div className="mt-3">
          <button type="submit">Update Address</button>
        </div>
      </form>
    </main>
  );
};

export default Address;