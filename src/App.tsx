import { useDispatch } from 'react-redux';
import './App.css'
import { sendForm } from './redux/contactUsSlice';
import { useEffect } from 'react';
import { AppDispatch } from './redux/store';
import { Route, Routes } from 'react-router-dom';
import { ContactUs } from './components/ContactUs';

function App() {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() =>{
    dispatch(sendForm())
  }, [dispatch])
  return (

    <Routes>
      <Route path='/' element ={<ContactUs />}/>
    </Routes>
  )
}

export default App
