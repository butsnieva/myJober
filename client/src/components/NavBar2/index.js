import React from 'react'
import logo from '../../assets/images/logo.png'

import { Route, NavLink, HashRouter, Switch } from 'react-router-dom'
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

  return (
    <HashRouter>
      <div className='flex flex-no-wrap'>
        {loggedIn && data ? (
          <>


            {/* Sidebar starts */}
            <div className='w-48 h-screen fixed bg-gray-50 shadow-lg flex-col justify-between hidden sm:flex'>
              <div className='px-8'>
                <div className='h-16 mt-5 w-full'>
                  <img src={logo} alt='Logo' width={130}></img>
                </div>
                <ul className='mt-12'>
                  <li className='flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'>
                    <NavLink exact to='/' className='flex items-center' replace>
                      <IoHomeOutline className='h-5 w-5 text-gray-600' />
                      <span className='text-md ml-3'>Main menu</span>
                    </NavLink>
                  </li>
                  <li className='flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'>
                    <NavLink
                      exact
                      to='/Dashboard'
                      className='flex items-center'
                      replace
                    >
                      <BsBriefcase className='h-5 w-5 text-gray-600' />
                      <span className='text-md ml-3'>Dashboard</span>
                    </NavLink>
                  </li>
                  <li className='flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'>
                    <NavLink
                      className='flex items-center'
                      exact
                      to='/Myjobs'
                      replace
                    >
                      <BsCardChecklist className='h-5 w-5 text-gray-600' />
                      <span className='text-md ml-3'>My Listings</span>
                    </NavLink>
                  </li>
                  <li className='flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6'>
                    <NavLink
                      exact
                      to='/Settings'
                      className='flex items-center'
                      replace
                    >
                      <IoSettingsOutline className='h-5 w-5 text-gray-600' />
                      <span className='text-md ml-3'>Settings</span>
                    </NavLink>
                  </li>
                  <li
                    className='flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center'
                    onClick={logout}
                  >
                    <div className='flex items-center'>
                      <VscSignOut className='h-5 w-5 text-gray-600' />
                      <span className='text-md ml-3'>Loguot</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* Sidebar ends */}
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className='container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6'>
              <div className='w-full h-full'>
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
            </div>
          </>
        ) : (
          <div>
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
              <div className='relative flex items-center justify-between h-16'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'></div>
                <div className='sm:block sm:ml-auto sm:mr-auto'>
                  <img className=' h-12' src={logo} alt='Logo' />
                </div>
                <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-end'>
                  <div className='hidden sm:block sm:ml-6'>
                    <div className='flex space-x-4'>
                      <div>
                        <NavLink
                          exact
                          to='/'
                          className='nav-link text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium'
                          replace
                        >
                          About
                        </NavLink>
                        <NavLink
                          exact
                          to='/'
                          className='nav-link text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium'
                          replace
                        >
                          Contact Us
                        </NavLink>
                        <NavLink
                          exact
                          to='/'
                          className='nav-link text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium'
                          replace
                        >
                          FAQ
                        </NavLink>
                        <NavLink
                          exact
                          to='/Login'
                          className='nav-link text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium'
                          replace
                        >
                          Login
                        </NavLink>
                      </div>
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
      </div>
    </HashRouter>
  )
}

export default Nav
