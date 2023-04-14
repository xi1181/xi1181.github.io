import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import LoaderLogo from '../loader-logo';

const AnimatedSplash = () => {
  return (
    <div className="logo_wrapper" style={{ backgroundColor: 'black' }}>
      <div className="screen">
        <LoaderLogo id="logo" />
      </div>
    </div>
  );
};

const Splash = () => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setRedirect(true), 5500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (redirect) {
      navigate('/home');
    }
  }, [redirect, navigate]);

  return <AnimatedSplash />;
};

export default Splash;
