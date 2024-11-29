"use client"
import Image from 'next/image';
import { IoMdStar } from 'react-icons/io';

export default function Quality() {
    return (
        <div className="bg-white py-4 md:px-28 mt-10">
            <strong className="text-primary my-8">Get your best looking smile now!</strong>
            <h3 className="text-primaryText font-bold text-5xl my-4">Get Quality Education</h3>
            <p className="text-secondText w-9/12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, aliquid! Dolor vitae totam animi aperiam molestiae
            </p>
            <div className="flex mt-8 space-x-8 flex-wrap">
                <div className="flex-1 shadow rounded p-4 relative min-w-80">
                    <span className="absolute flex items-center bg-secondary p-2 rounded">
                        <IoMdStar color="yellow" />
                        <span className="text-white font-bold">(3.5)</span>
                    </span>
                    <Image src="/product-cover-133 sec-.png" alt="" width={100} height={100} layout="responsive" />
                    <h4 className="text-primary font-bold text-md mt-4">Training Course</h4>
                    <h5 className="text-primaryText font-bold py-4 flex items-center">Yousef Baba</h5>
                    <p className="text-secondText">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quas in maxime, eaque blanditiis consequatur fuga perferendis
                        at nemo nesciunt rerum eos enim expedita quisquam, assumenda tempora non cum quae.
                    </p>
                </div>
                <div className="flex-1 shadow rounded p-4 relative  min-w-80">
                    <span className="absolute flex items-center bg-secondary p-2 rounded">
                        <IoMdStar color="yellow" />
                        <span className="text-white font-bold">(3.5)</span>
                    </span>
                    <Image src="/product-cover-131.png" alt="" width={100} height={100} layout="responsive" />
                    <h4 className="text-primary font-bold text-md mt-4">Probability Course</h4>
                    <h5 className="text-primaryText font-bold py-4">Yousef Baba</h5>
                    <p className="text-secondText">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quas in maxime, eaque blanditiis consequatur fuga perferendis
                        at nemo nesciunt rerum eos enim expedita quisquam, assumenda tempora non cum quae.
                    </p>
                </div>
                <div className="flex-1 shadow rounded p-4 relative  min-w-80">
                    <span className="absolute flex items-center bg-secondary p-2 rounded">
                        <IoMdStar color="yellow" />
                        <span className="text-white font-bold">(3.5)</span>
                    </span>
                    <Image src="/product-cover-133 sec-.png" alt="" width={80} height={80} layout="responsive" />
                    <h4 className="text-primary font-bold text-md mt-4">Training Course</h4>
                    <h5 className="text-primaryText font-bold py-4">Yousef Baba</h5>
                    <p className="text-secondText">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quas in maxime, eaque blanditiis consequatur fuga perferendis
                        at nemo nesciunt rerum eos enim expedita quisquam, assumenda tempora non cum quae.
                    </p>
                </div>
                <div className="flex-1 shadow rounded p-4 relative  min-w-80">
                    <span className="absolute flex items-center bg-secondary p-2 rounded">
                        <IoMdStar color="yellow" />
                        <span className="text-white font-bold">(3.5)</span>
                    </span>
                    <Image src="/product-cover-131.png" alt="" width={100} height={100} layout="responsive" />
                    <h4 className="text-primary font-bold text-md mt-4">Training Course</h4>
                    <h5 className="text-primaryText font-bold py-4">Yousef Baba</h5>
                    <p className="text-secondText">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quas in maxime, eaque blanditiis consequatur fuga perferendis
                        at nemo nesciunt rerum eos enim expedita quisquam, assumenda tempora non cum quae.
                    </p>
                </div>
            </div>
        </div>
    );
}
