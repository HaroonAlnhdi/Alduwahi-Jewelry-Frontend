import { useState } from "react";
import { useParams } from "react-router-dom";

import * as profileService from "../../services/profileService";

const AddressForm = ({ setAddress }) => {
  const { userId } = useParams();
  const [addressData, setAddressData] = useState({
    user_id: userId,
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (addrData) => {
    const newAddress = await profileService.create(addrData);
    setAddress(newAddress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddAddress(addressData);
  };

  return (
    <main>
      <h1>Add Address</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            value={addressData.street}
            name="street"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={addressData.city}
            name="city"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={addressData.state}
            name="state"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="zip">Zip:</label>
          <input
            type="text"
            id="zip"
            value={addressData.zip}
            name="zip"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </main>
  );
};

export default AddressForm;
