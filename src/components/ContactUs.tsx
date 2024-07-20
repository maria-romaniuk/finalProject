import { useState } from "react"
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { sendForm, updateForm } from "../redux/contactUsSlice";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faSeedling } from '@fortawesome/free-solid-svg-icons';
// import style from '../styles/ContactUs.module.css'

interface Errors {
    name?: string;
    email?: string;
    message?: string;
    recaptcha?: string;
}

export const ContactUs = () => {
    const { form, status } = useSelector((state: RootState) => state.contactForm);
    const dispatch: AppDispatch = useDispatch();

    const [errors, setErrors] = useState<Errors>({});

    const recaptchaRef = React.createRef<ReCAPTCHA>();

    const validateForm = () => {
        const newErrors: Errors = {
            name: "",
            email: "",
            message: ""
        };
        if (!form.name.trim()) {
            newErrors.name = "Name is required and cannot be empty";
        }
        if (!form.email.trim()) {
            newErrors.email = "Email is required and cannot be empty";
        }
        if (!form.message.trim()) {
            newErrors.message = "Message is required and cannot be empty";
        }
        return newErrors;
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(updateForm({ ...form, [name]: value }));
    };


    const handleSendForm = (e: React.FormEvent) => {
        e.preventDefault(); // Отменяем стандартное поведение отправки формы

        const validationErrors = validateForm(); // Выполняем валидацию формы

        if (Object.keys(validationErrors).length > 0) { // Проверяем, есть ли ошибки валидации
            setErrors(validationErrors); // Устанавливаем ошибки в состояние компонента
            return; // Прекращаем выполнение функции, если есть ошибки
        }
        const recaptchaValue = recaptchaRef.current?.getValue();
        if (!recaptchaValue) {
            setErrors((prevErrors) => ({ ...prevErrors, recaptcha: "Please verify that you are not a robot" }));
            return;
        }


        setErrors({}); // Если ошибок нет, очищаем состояние ошибок

        dispatch(sendForm(form)); // Отправляем данные формы на сервер через Redux
        recaptchaRef.current?.reset(); // Сбрасываем ReCAPTCHA после успешной отправки
    };

    return (
        <div>
            <header>
                <div className="container d-flex align-items-end justify-content-between">
                    <div className="logo">
                        <a href=""><FontAwesomeIcon icon={faSeedling} /> with you</a>
                    </div>
                    <div className="nav-content d-flex align-self-end">
                        <a href="#" className="nav-link mx-3">News</a>
                        <a href="#" className="nav-link  mx-3">Blog</a>
                        <a href="#" className="nav-link  mx-3">e-commerce</a>
                        <a href="#" className="nav-link  mx-3">about us</a>
                        <a href="#" className="mActive nav-link  mx-3">contact us</a>
                    </div>
                </div>
            </header>

            <section className="contactUs">
                <div className="contact-title">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p>You can contact us any way that is convenient for you. We are available 24/7 via email. You can also use a quick contact form below or visit our office personally. We would be happy to answer your questions. </p>
                    </div>
                </div>
                <div className="container d-flex">
                    <div className="contact-info w-50 p-5 list-group">
                        <div className="list-group-item"><FontAwesomeIcon icon={faPhone} /><span> Phone:</span>+49(123)9876543</div>
                        <div className="list-group-item"><FontAwesomeIcon icon={faEnvelope} /><span> E-mail:</span>gmailnews@gmail.com</div>
                    </div>
                    <div className="w-50 p-5">
                        <p>If you have any ideas or suggestions for improving our Web-site, please contact us by filling the form.</p>
                        <form onSubmit={handleSendForm} className="input-group d-flex flex-column">
                            <label htmlFor="">name
                                <input type="text" className="form-control" value={form.name} name='name' onChange={handleInputChange} placeholder='Enter your name' />
                                {errors.name && <div className="error">{errors.name}</div>}
                            </label>
                            <label htmlFor="">e-mail
                                <input type="text" className="form-control" value={form.email} name='email' onChange={handleInputChange} placeholder='Enter your e-mail' />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </label>
                            <label htmlFor="">Message
                                <textarea value={form.message} name='message' className="form-control" onChange={handleInputChange} placeholder='enter your message'></textarea>
                                {errors.message && <div className="error">{errors.message}</div>}
                            </label>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey="Your client site key"
                            />
                            <button type="submit" className="btn btn-info">
                                {status === 'loading' ? 'Sending...' : 'Send'}
                            </button>
                            {status === 'success' && <div>Form submitted successfully!</div>}
                            {status === 'error' && <div>Failed to submit the form.</div>}
                        </form>
                    </div>
                </div>
            </section>
            <section className="newsrun">
                <div className="container">
                    <div className="news-date"></div>
                    {/* <div className="news-carousel vertical carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-100" src="..." alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="..." alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src="..." alt="Third slide" />
                            </div>
                        </div>
                    </div> */}
                     <Carousel className="vertical">
            <Carousel.Item>
                <p>text1</p>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <p>text2</p>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <p>text3</p>
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
                </div>
            </section>

            <footer>

            </footer>
        </div>
    )
}