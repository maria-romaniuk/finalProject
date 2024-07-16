import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { sendForm, updateForm } from "../redux/contactUsSlice";

interface Errors {
    name: string;
    email: string;
    message: string;
  }

export const ContactUs = () => {
const {form, status} = useSelector((state: RootState) => state.contactForm);
const dispatch: AppDispatch = useDispatch();

const [errors, setErrors] = useState<Errors>({});

const validateForm = () =>{
    const newErrors: Errors = {};
    if(!form.name.trim()){
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

    setErrors({}); // Если ошибок нет, очищаем состояние ошибок

    dispatch(sendForm(form)); // Отправляем данные формы на сервер через Redux

};

    return (
        <div>
            <h1>Contact Us</h1>
            <div className="contactInfo">
                <div><span> Phone:</span>+49(123)9876543</div>
                <div><span> E-mail:</span>gmailnews@gmail.com</div>
                <div><span> Phone:</span>+7(123)987654</div>
            </div>


            <div className="container">
                <p>If you have any ideas or suggestions for improving our Web-site, please contact us by filling the form.</p>
                <form onSubmit={handleSendForm}> 
                    <label htmlFor="">name
                        <input type="text" value={form.name} name='name' onChange={handleInputChange} placeholder='Enter your name'/>
                        {errors.name && <div className="error">{errors.name}</div>}
                    </label>
                    <label htmlFor="">e-mail
                        <input type="text" value={form.email} name = 'email' onChange={handleInputChange} placeholder='Enter your e-mail'/>
                        {errors.email && <div className="error">{errors.email}</div>}
                    </label>
                    <label htmlFor="">
                         <textarea value={form.message} name = 'message' onChange={handleInputChange} placeholder='enter your message'></textarea>
                         {errors.message && <div className="error">{errors.message}</div>}
                    </label>
                   
                    <button type="submit">
                    {status === 'loading' ? 'Sending...' : 'Send'}
                    </button>
                    {status === 'success' && <div>Form submitted successfully!</div>}
                    {status === 'error' && <div>Failed to submit the form.</div>}
                </form>
            </div>
        </div>
    )
}