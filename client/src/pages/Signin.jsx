import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { signInStart, signInSuccess, signInFail } from '../redux/user/userSlice';

export default function Signin() {
  const [formData, setFormData] = useState({});

  const {loading, error} = useSelector((state) => state.user);  // Added

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(null);

    try {

      dispatch(signInStart());

      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json(); // Changed 'response' to 'res'
      console.log(data);
      
      if (data.success === false) {

        dispatch(signInFail(data.message));

        return;
      }

      dispatch(signInSuccess(data));

      navigate('/');

    } catch (error) {

      dispatch(signInFail(error.message));

    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">SignIn</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          className="border rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <button
          disabled={loading}
          className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/sign-up" className="text-blue-700">
          Sign Up
        </Link>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}

    </div>
  );
}
