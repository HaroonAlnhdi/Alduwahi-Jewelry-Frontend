import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import "./ContactUs.css";
import contectUsService from "../../services/contectUsService";

const ContactUS = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   console.log("send message");
      await contectUsService.content(formData);
    setFormData({});
    setFormData({});
    Swal.fire({
      title: "Good job!",
      text: "Your message has been sent successfully!",
      icon: "success",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <form  onSubmit={handleSubmit}className="CantactUs">
        <h1>Contact Us</h1>
        <label htmlFor="email"> Email :</label>
        <input type="text" name="email" id="email"  onChange={handleChange} />
        <label htmlFor="message">Descreption :</label>
        <textarea name="message" id="message" onChange={handleChange}></textarea>
        <button type="submit" >Submit</button>
      </form>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thank You</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for contacting us! We will get back to you soon.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactUS;
