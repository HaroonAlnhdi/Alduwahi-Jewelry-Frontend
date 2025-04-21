import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { showProducts } from '../../services/HomePageService'; // Assuming this fetches product data
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { FaCheckCircle, FaThList, FaHeadset } from 'react-icons/fa';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const HomePage = (user) => {
    const { t, i18n } = useTranslation();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            const productData = await showProducts();
            setProducts(productData);
        };

        fetchAllProducts();
    }, [user]);

    return (
        <section className="homeSection mt-3">
                <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}>
  {i18n.language === 'en' ? 'عربي' : 'English'}
</button>
                <div className="row align-items-center panner ">
                    <div className="col-md-5 col-sm-12 co-lg-12 c-item">
                        <Carousel >
                            <Carousel.Item interval={1000}>
                                <img
                                    src="https://i.pinimg.com/564x/01/ad/dd/01addd283d9d961949dee6b3ed7bd53a.jpg"
                                    alt="First slide"
                                    className='c-img'
                                />
                            </Carousel.Item>

                            <Carousel.Item interval={3000}>
                                <img
                                    src="https://i.pinimg.com/736x/93/6d/dd/936ddd680ac0cb09e51445fe5b2dd731.jpg"
                                    alt="Second slide"
                                    className='c-img'
                                />
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img
                                    src="https://i.pinimg.com/564x/c7/6a/1c/c76a1cfb1c178299d1729ec3c0ed45fe.jpg"
                                    alt="Third slide"
                                    className="c-img"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            

            <section className="collections">
                <div className="container mt-5">
                    <h2 className="text-start tit">Collections</h2>
                    <div className="row">
                        {products.slice(0, 6).map((product, index) => (
                            <div className="col-md-4 col-sm-6 mb-4" key={index}>
                                <div className="card h-100">
                                    <Link to={`/products/${product._id}`}>
                                    <img
                                        src={product.imageP}
                                        className="card-img-top"
                                        alt={product.name}
                                    />
                                    </Link>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            {product.description}
                                        </p>
                                        <p className="card-text">
                                            <strong>Price: </strong>${product.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='text-center'>
                        <Link to="/products" className="btn btn-primary">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            <section className='Blog'>

                <div className="container mt-5">
                    <p></p>
                    <h2 className="text-start tit">Flash Sales</h2>
                    
                    <div className="row">
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <img
                                    src="https://i.pinimg.com/564x/74/bf/ea/74bfead551bacce9bba53310c5d441f8.jpg"
                                    className="card-img-top h-100"
                                    alt="flash sale"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Black Jacket</h5>
                                    <p className="card-text">
                                    A cozy hoodie that blends comfort with a touch of mystery. Perfect for those chilly evenings
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <img
                                    src="https://i.pinimg.com/564x/8e/40/a7/8e40a7b62af14222950428bb688bcd41.jpg"
                                    className="card-img-top h-100"
                                    alt="flash sale"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Galaxy T-Shirt</h5>
                                    <p className="card-text">
                                    A vibrant t-shirt featuring a stunning galaxy print. Stand out from the crowd with this unique piece.                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <img
                                    src="https://i.pinimg.com/564x/01/92/8b/01928b914f1b3a17ffa4565ac287c8f0.jpg"
                                    className="card-img-top h-100"
                                    alt="flash sale"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Ethereal Dress</h5>
                                    <p className="card-text">
                                    A flowing dress that captures the essence of elegance and grace. Ideal for any special occasion.                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </section>

            <section className='quotes'>

                <div className="container mt-5">

                    <h2 className="text-start tit">What Our Customers Say</h2>
                    <div className="row">
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">"I love the quality of the clothes here. They are so comfortable and stylish!"</h5>
                                    <p className="card-text">
                                        <small> - Ahmed hamed</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">"The customer service here is amazing. They are so helpful and friendly!"</h5>
                                    <p className="card-text">
                                        <small> - Haroon Alnahdi</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">"I love the variety of clothes here. There is something for everyone!"</h5>
                                    <p className="card-text">
                                        <small> - Mahmmod Isa</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </section>



            <section>
                <div className="container mt-5">
                    <h2 className="text-start tit ">features</h2>
                    <div className="row">
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <FaCheckCircle size={48} className="mb-3" />
                                    <h5 className="card-title">Quality</h5>
                                    <p className="card-text">
                                        We provide high-quality clothes that are comfortable and stylish.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <FaThList size={48} className="mb-3" />
                                    <h5 className="card-title">Variety</h5>
                                    <p className="card-text">
                                        We offer a wide range of styles and sizes to suit everyone.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <FaHeadset size={48} className="mb-3" />
                                    <h5 className="card-title">Customer Service</h5>
                                    <p className="card-text">
                                        Our customer service is top-notch. We are always here to help.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='contectUs'>
    <div className="container mt-5">
        <h2 className="text-start tit ">Contact Us</h2>
        <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-12 mb-4">
                <div className="card h-100">
                    <div className="card-body">
                        <h5 className="card-title">Email</h5>
                        <p className="card-text">
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" />
                        </p>
                        <p>
                        <FaPhone className="me-2" />
                            Phone Number :  +973 33445566
                        </p>
                        <p>
                        <FaMapMarkerAlt className="me-2" />
                            Address :  Manama, Bahrain
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


        </section>
    );
};

export default HomePage;
