import { useDispatch } from 'react-redux';
import './App.css'
import { sendForm } from './redux/contactUsSlice';
import { useEffect } from 'react';
import { AppDispatch } from './redux/store';
import { Route, Routes } from 'react-router-dom';
// import { ContactUs } from './components/ContactUs';
import NewsList from './components/NewsList';
import { newsData } from './components/data/postman';
import { setNews } from './redux/newsSlice';

function App() {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() =>{
    dispatch(sendForm({ name: '', email: '', message: '' }))
    dispatch(setNews(newsData));
  }, [dispatch])
  return (

    <Routes>
      {/* <Route path='/' element ={<ContactUs />}/> */}
      <Route path='/' element ={<NewsList />}/>
    </Routes>
  )
}

export default App
