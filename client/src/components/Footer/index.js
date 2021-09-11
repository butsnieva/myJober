import React from "react";
import city from "../../assets/images/Footer/city.png";
// import { AiFillGithub } from 'react-icons/ai';
// import { FiMail } from 'react-icons/fi';
// import { FaLinkedinIn } from 'react-icons/fa';



const Footer = () => {

    return (
      <div>
        <footer className='text-center text-gray-600 my-3 mt-16 bg-gray-300 bg-opacity-40 mb-0 py-2'>
          <span className='text-md cust-font'> © Kateryna Butsnieva</span>
          {/* <div className='flex justify-center'>
            <a
              className='hover:text-gray-400'
              href='https://github.com/butsnieva'
              target='_blank'
            >
              <AiFillGithub className='w-5 h-5 mx-1' />
            </a>
            <a
              className='hover:text-gray-400'
              href='mailto:butsnieva@gmail.com'
            >
              <FiMail className='w-5 h-5 mx-1' />
            </a>
            <a
              className='hover:text-gray-400'
              href='https://www.linkedin.com/in/butsnieva/'
              target='_blank'
            >
              <FaLinkedinIn className='w-5 h-5 mx-1' />
            </a>
          </div> */}
        </footer>

        <img
          href='/'
          alt='background'
          className='bg-bottom bg-city w-full'
          src={city}
        />
      </div>
    );
}

export default Footer;