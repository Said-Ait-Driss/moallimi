
import React from "react"

export default function Subscribe() {
    return (
        <div className='flex bg-lightPrimary'>
        <div className='flex-1 p-4 ps-28 my-28 text-center'>
            <strong className='text-primary my-8 mx-auto'>newsletter</strong>
            <h3 className="text-primaryText font-bold text-5xl my-4">Subscribe Now</h3>
            <p className="text-secondText">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, aliquid! Dolor vitae totam animi aperiam molestiae
            </p>
            <form action="" className="px-28 my-4">
                <FormInput/>
            </form>
        </div>
        </div>
    )
}

const FormInput = () => {
    return (
      <>
        <div className='flex items-center'>
          <input
            type='text'
            placeholder='Email'
            className='w-full bg-white rounded-lg rounded-r-none border border-stroke pr-3 pl-5 py-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
          />
            <button className='h-full rounded-lg rounded-s-none border border-s-0 border-stroke py-4 px-4 text-base text-white bg-primary hover:bg-primary/90'>
            Subscribe
          </button>
        </div>
      </>
    )
  }