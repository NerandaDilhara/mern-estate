import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import About from './pages/About';
import Home from './pages/Home';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<Signin />}/>
        <Route path='/sign-up' element={<Signup />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}
