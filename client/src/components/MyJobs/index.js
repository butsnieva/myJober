import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
// import Auth from '../../utils/auth'
import map from '../../assets/images/map-img-placeholder.png';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import {useMutation} from '@apollo/client';
import { REMOVE_JOB } from '../../utils/mutations';
import EditJobModal from '../EditJobModal'


const MyJobs = () => {
    const { data } = useQuery(QUERY_ME);
    const [jobs] = useState(data.me.jobs || []);
    const [removeJob] = useMutation(REMOVE_JOB)


    const handleDeleteBtn = async jobId => {
      try {
        await removeJob ({
          variables: { jobId },
        })
      } catch (err) {
        console.log(err)
      }
        window.location.reload()
    } 


  if (!jobs.length) {
    return (
      <div className='grid justify-items-center mt-36'>
        <h3 className='text-center text-2xl text-gray-600 cust-font mb-8'>
          You don't have any job postings at this moment. <br /> Go ahead and
          create one!
        </h3>
        <div className='w-60 mt-3 sm:mt-0'>
          <NavLink
            exact
            to='/JobPosting'
            className='btn-main-yellow font-bold flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-gray-600 md:py-4 md:text-lg md:px-10 nav-link'
            replace
          >
            Create Job Post
          </NavLink>
        </div>
      </div>
    )
  }


    return (
      <div>
        {jobs &&
          jobs.map((job) => (
            <div key={job._id} className='flex mx-16 mt-5'>
              <div className='md:w-9/12 flex bg-white border border-gray-200 shadow-lg sm:rounded-lg sm:overflow-hidden'>
                <div className='flex-1 px-4 py-5 bg-white space-y-6 sm:p-6'>
                  <div>
                    <div className='flex justify-between block text-xl font-medium text-gray-700'>
                      <p>{job.title}</p>
                      <p className='cust-font'>${job.price}</p>
                    </div>
                    <div className='mt-1 flex'>
                      <div className='h-24'></div>
                      <div
                        className='
                        flex-initial mt-1 block w-full sm:text-sm border
                        border-gray-200 rounded-lg'
                      >
                        <p className='py-2 px-3 text-gray-800 h-auto'>
                          {job.description.split('\n').map((i) => {
                            return (
                              <p>
                                {i}
                                <br />
                              </p>
                            )
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between'>
                    <div className='flex text-xs cust-font'>
                      <p className='flex items-end'>Date posted: 8-23-2021</p>
                    </div>
                    <div className='flex items-center'>
                      {/* EDIT BUTTON */}
                      <EditJobModal
                        jobId={job._id}
                        title={job.title}
                        description={job.description}
                        price={job.price}
                        location={job.location}
                      />

                      <button
                        type='button'
                        className='btn-main-red py-2.5 px-5 border border-none shadow-md rounded-lg text-sm leading-4 font-bold text-gray-700 focus:outline-none focus:ring-none'
                        onClick={() => handleDeleteBtn(job._id)}
                        id={job._id}
                      >
                        Delete job
                      </button>
                    </div>
                  </div>
                </div>

                <div className='m-auto mr-5 map'>
                  <img alt='map' src={map} className='rounded-lg h-auto w-44' />
                </div>
              </div>
              <div className='md:w-3/12 mx-3'>
                <div className='h-full flex bg-white border border-gray-200 shadow-lg sm:rounded-lg sm:overflow-hidden'>
                  <div className='bg-white space-y-2 sm:p-6 text-gray-700'>
                    <p className='cust-font border-b'>POST INSIGHTS</p>
                    <p>Status: <span className='text-green-700'>Active</span></p>
                    <p>Requests count: <span className='font-bold cust-font'>3</span></p>
                    <p>Messages count: <span className='font-bold cust-font'>2</span></p>
                    <p>Expires in: 21 day</p>
                    <p className='text-xs text-gray-500 pt-2'>Post ID: {job._id}</p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    )
}

export default MyJobs;