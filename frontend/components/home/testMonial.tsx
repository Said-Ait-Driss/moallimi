"use client"
import React from "react"
import Image from 'next/image';
import { IoMdStar } from 'react-icons/io';
import { IoMdStarOutline } from "react-icons/io";

export default function TestMonial() {
    return(
        <div className="bg-white py-4 md:px-28 mt-10">
            <strong className="text-primary my-8">Testimonials</strong>
            <h3 className="text-primaryText font-bold text-5xl my-4">Learners</h3>
            <p className="text-secondText w-9/12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, aliquid! Dolor vitae totam animi aperiam molestiae
            </p>
            <div className="flex mt-8 space-x-8 flex-wrap">
                <div className="flex-1 rounded p-4 relative min-w-80 text-center">
                    <Image src="/product-cover-133 sec-.png" alt="" width={100} height={100} className="rounded-full mx-auto"/>
                    <p className="text-secondText my-4 w-96 mx-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quas in maxime, eaque blanditiis consequatur fuga perferendis
                        at nemo nesciunt rerum cum quae.
                    </p>
                    <span className="flex items-center mx-auto w-24">
                        <IoMdStar color="yellow" />
                        <IoMdStar color="yellow" />
                        <IoMdStar color="yellow" />
                        <IoMdStar color="yellow" />
                        <IoMdStarOutline color="yellow" />
                    </span>
                    <h5 className="text-primaryText font-bold py-4 text-center">Yousef Baba</h5>
                    <h6 className="text-secondText">Student</h6>
                </div>
                <div className="flex-1 rounded p-4 relative min-w-80 text-center">
                    <Image src="/product-cover-131.png" alt="" width={100} height={100} className="rounded-full mx-auto"/>
                    <p className="text-secondText my-4 w-96 mx-auto">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quas in maxime, eaque blanditiis consequatur fuga perferendis
                        at nemo nesciunt rerum eos enim expedita quisquam, assumenda tempora non cum quae.
                    </p>
                    <span className="flex items-center mx-auto w-24">
                        <IoMdStar color="yellow" />
                        <IoMdStar color="yellow" />
                        <IoMdStar color="yellow" />
                        <IoMdStarOutline color="yellow" />
                        <IoMdStarOutline color="yellow" />
                    </span>
                    <h5 className="text-primaryText font-bold py-4 text-center">Yousef Baba</h5>
                    <h6 className="text-secondText">Student</h6>
                </div>
            </div>
        </div>
    )
}