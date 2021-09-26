import React from 'react'
import logo from '../../assets/images/logo.png'

import { Route, HashRouter, Switch, NavLink } from 'react-router-dom'
import Auth from '../../utils/auth'

import { BsBriefcase, BsCardChecklist } from 'react-icons/bs'
import { IoSettingsOutline, IoHomeOutline } from 'react-icons/io5'
import { VscSignOut } from 'react-icons/vsc'

import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../../utils/queries'

import Home from '../../pages/Home'
import Login from '../../pages/Login'
import Signup from '../../pages/Signup'
import Main from '../../pages/Main'
import Dashboard from '../../pages/Dashboard'
import Settings from '../../pages/Settings'
import JobPosting from '../../pages/JobPosting'
import MyJobs from '../MyJobs/index'



const Nav = () => {

  const { data } = useQuery(QUERY_ME)
  const loggedIn = Auth.loggedIn()

  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }

  const navbarLoggedIn = [
    { name: 'Main Menu', href: '/', icon: <IoHomeOutline/> },
    { name: 'Dashboard', href: '/Dashboard', icon: <BsBriefcase/> },
    { name: 'My Listings', href: '/Myjobs', icon: <BsCardChecklist/> },
    { name: 'Settings', href: '/Settings', icon: <IoSettingsOutline/> },
  ]
  const navbarNotLoggedIn = [
    { name: 'About', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Login', href: '#/Login' },
  ]


  return (
    <HashRouter>
      {loggedIn && data ? (
        <>
          {/* Logo & User info section starts*/}
          <div className='fixed w-full z-2 bg-gray-50 bg-opacity-75 shadow-sm pb-1'>
            <div className='flex justify-between'>
              <div className='ml-5 mt-1'>
                <img className=' h-12' src={logo} alt='Logo' />
              </div>
              <div className='relative flex mt-1 mr-14 items-center'>
                <div className='mr-3'>
                  <div>
                    <p className='cust-font font-bold text-gray-600'>
                      {data.me.firstName} {}
                      {data.me.lastName}
                    </p>
                    <p className='text-gray-500 text-xs flex justify-end'>
                      ★★★☆☆
                    </p>
                  </div>
                </div>
                <div className='border rounded-full border-gray-300'>
                  <span className='flex inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100'>
                    <svg
                      className='h-full w-full text-gray-300'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Logo & User info section ends*/}

          {/* Sidebar starts */}
          <div className='mt-14 w-48 h-screen fixed bg-gray-50 bg-opacity-75 shadow-lg flex-col justify-between hidden sm:flex'>
            <div className='px-8'>
              <div className='mt-12'>
                {navbarLoggedIn.map((page, i) => (
                  <NavLink
                    key={i}
                    exact
                    to={page.href}
                    replace
                    activeClassName='border-b font-bold'
                    className='flex w-full text-gray-600 hover:text-gray-500 cursor-pointer items-center mt-5'
                  >
                    <div className='mr-3 text-xl'>{page.icon}</div>
                    {page.name}
                  </NavLink>
                ))}
                <a
                  className='flex w-full text-gray-600 hover:text-gray-500 cursor-pointer items-center mt-5'
                  onClick={logout}
                  href='/'
                >
                  <div className='flex items-center'>
                    <VscSignOut className='h-5 w-5 text-gray-600' />
                    <span className='text-md ml-3'>Logout</span>
                  </div>
                </a>
              </div>
            </div>
            <div className='text-center text-gray-600 mb-16 border-t'>
              <a
                className='text-xs cust-font hover:text-gray-500'
                href='https://www.linkedin.com/in/butsnieva/'
                target='_blank'
                rel='noreferrer'
              >
                © Kateryna Butsnieva
              </a>
            </div>
          </div>
          {/* Sidebar ends */}

          {/* Data container starts */}
          <div className='pt-20 pb-12 ml-48'>
            <div className='object-center'>
              <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/Dashboard' component={Dashboard} />
                <Route path='/Settings' component={Settings} />
                <Route path='/JobPosting' component={JobPosting} />
                <Route path='/Myjobs' component={MyJobs} />
              </Switch>
            </div>
          </div>
          {/* Data container ends */}
        </>
      ) : (
        <div>
          {/* Welcome page navbar, user is not logged in */}
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'></div>
              <div className='sm:block sm:ml-auto sm:mr-auto'>
                <img className=' h-12' src={logo} alt='Logo' />
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-end'>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {navbarNotLoggedIn.map((page, i) => (
                      <div
                        key={i}
                        className='text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-md text-sm font-medium'
                      >
                        <a href={page.href}>{page.name}</a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='object-center'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/Login' component={Login} />
              <Route path='/Signup' component={Signup} />
            </Switch>
          </div>
        </div>
      )}
    </HashRouter>
  )
}

export default Nav
