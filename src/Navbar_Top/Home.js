import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useGlobalContext } from './context';

const Home = () => {
  const { openSidebar } = useGlobalContext();
  return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    
      <button onClick={openSidebar} className='sidebar-toggle'>
        <FaBars style={{ color: 'green' }}/>
      </button>
      {/* <button onClick={openModal} className='btn'>
        show modal
      </button> */}
      </>
  );
};

export default Home;
