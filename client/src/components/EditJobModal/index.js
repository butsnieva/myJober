import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useMutation } from '@apollo/client'
import { UPDATE_JOB } from '../../utils/mutations'

const EditJobModal = ({
  jobId,
  title,
  description,
  price,
  location,
}) => {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  // create a new job
  const [formState, setFormState] = useState({
    jobId: jobId,
    title: title,
    description: description,
    price: price,
    location: location,
  })


  const [updateJob, { error }] = useMutation(UPDATE_JOB)

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  // submit form,  pass the data from the form state object as variables for our addUser mutation function
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    // use try/catch instead of promises to handle errors
    try {
      // execute addJob mutation and pass in variable data from form
      const { data } = await updateJob({
        variables: { ...formState },
      })

      console.log('form from addJob:', data)

      window.location.reload()
    } catch (e) {
      console.error(e)
      // window.location.reload();
    }
  }


  return (
    <>
      <button
        onClick={() => setOpen((open) => !open)}
        type='button'
        className='mr-2 bg-gray-200 hover:bg-gray-300 py-2.5 px-5 border border-none shadow-md rounded-lg text-sm leading-4 font-bold text-gray-700 focus:outline-none focus:ring-none'
      >
        Edit
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          auto-reopen='true'
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        Edit Your Job Details
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className='mt-5 md:mt-0 md:col-span-2'>
                  <form action='#' method='PUT' onSubmit={handleFormSubmit}>
                    <div className='shadow overflow-hidden sm:rounded-md'>
                      <div className='rounded-xl px-4 py-5 sm:p-6'>
                        <div className='grid grid-cols-6 gap-6'>
                          <div className='col-span-9 sm:col-span-4'>
                            <label
                              htmlFor='title'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Title
                            </label>
                            <input
                              value={formState.title}
                              placeholder='Job title'
                              type='text'
                              name='title'
                              id='title'
                              onChange={handleChange}
                              className='mt-1 line-height focus:ring-gray-400 focus:border-gray-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>

                          <div className='col-span-3 sm:col-span-2'>
                            <label
                              htmlFor='price'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Price
                            </label>
                            <div className='mt-1 flex rounded-md shadow-sm'>
                              <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                                $
                              </span>
                              <input
                                type='text'
                                name='price'
                                id='price'
                                className='focus:ring-gray-400 focus:border-gray-400 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                                placeholder='Set your price'
                                value={formState.price}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className='col-span-6'>
                            <label
                              htmlFor='description'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Description
                            </label>
                            <textarea
                              type='text'
                              name='description'
                              id='description'
                              rows={3}
                              value={formState.description}
                              onChange={handleChange}
                              className='mt-1 focus:ring-gray-400 focus:border-gray-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                            />
                          </div>
                        </div>
                        <div className='mt-3 bg-white'></div>
                      </div>
                      <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'></div>
                    </div>
                    {error && (
                      <div>Something went wrong.. Please try again.</div>
                    )}
                    <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                      <button
                        type='submit'
                        className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 btn-cust-orange text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={() => setOpen(false)}
                      >
                        Submit
                      </button>
                      <button
                        type='button'
                        className='w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default EditJobModal
