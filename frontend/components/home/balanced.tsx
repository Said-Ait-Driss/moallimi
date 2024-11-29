'use client';
import Image from 'next/image';
import React from 'react';
import { MdSchool } from 'react-icons/md';
import { MdSchema } from 'react-icons/md';
import { BsTable } from 'react-icons/bs';
import { MdBackpack } from 'react-icons/md';

export default function BalancedLearning() {
    return (
        <div className="p-4 md:px-28 bg-white">
            <strong className="text-primary my-8">Balanced Learning</strong>
            <h3 className="text-primaryText font-bold text-5xl my-8">Every Client Matters</h3>
            <p className="text-secondText w-9/12">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam maxime provident, quia nam delectus laboriosam nisi, quam quo earum
                natus debitis architecto quisquam eveniet, officia consectetur tenetur nihil dicta voluptates.
            </p>

            <div className="flex flex-wrap my-12">
                <div className="flex-1 text-center min-w-80 shadow py-4 rounded">
                    <div className="p-2 bg-secondary rounded-full h-24 w-24 relative mx-auto">
                        <MdSchool size={40} color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <strong className="text-primaryText my-4">Certified Teachers</strong>
                    <div className="bg-secondary p-0.5 rounded w-24 mx-auto my-4"></div>
                    <p className="text-secondText text-justify p-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. ut exercitationem. Maxime fuga cum id soluta! Repellat omnis
                        consectetur fuga voluptatum. Ut adipisci possimus, nisi sed ex hic.
                    </p>
                </div>
                <div className="flex-1 text-center min-w-80  shadow py-4 rounded">
                    <div className="p-2 bg-secondary rounded-full h-24 w-24  relative mx-auto">
                        <MdSchema size={40} color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <strong className="text-primaryText my-4">Teacher proximity</strong>
                    <div className="bg-secondary p-0.5 rounded w-24 mx-auto my-4"></div>
                    <p className="text-secondText text-justify p-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. ut exercitationem. Maxime fuga cum id soluta! Repellat omnis
                        consectetur fuga voluptatum. Ut adipisci possimus, nisi sed ex hic.
                    </p>
                </div>
                <div className="flex-1 text-center min-w-80  shadow py-4 rounded">
                    <div className="p-2 bg-secondary rounded-full h-24 w-24  relative mx-auto">
                        <BsTable size={40} color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <strong className="text-primaryText my-4">Prefered Teachers</strong>
                    <div className="bg-secondary p-0.5 rounded w-24 mx-auto my-4"></div>
                    <p className="text-secondText text-justify p-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. ut exercitationem. Maxime fuga cum id soluta! Repellat omnis
                        consectetur fuga voluptatum. Ut adipisci possimus, nisi sed ex hic.
                    </p>
                </div>
                <div className="flex-1 text-center min-w-80  shadow py-4 rounded">
                    <div className="p-2 bg-secondary rounded-full h-24 w-24  relative mx-auto">
                        <MdBackpack size={40} color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <strong className="text-primaryText my-4">Self-regulated Learning</strong>
                    <div className="bg-secondary p-0.5 rounded w-24 mx-auto my-4"></div>
                    <p className="text-secondText text-justify p-8">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. ut exercitationem. Maxime fuga cum id soluta! Repellat omnis
                        consectetur fuga voluptatum. Ut adipisci possimus, nisi sed ex hic.
                    </p>
                </div>
            </div>
        </div>
    );
}
