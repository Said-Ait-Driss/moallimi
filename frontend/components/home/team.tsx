'use client';

import Image from 'next/image';
import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { IoMdStar } from 'react-icons/io';
import { IoMdStarOutline } from 'react-icons/io';

const teachers = [
    {
        name: 'john kinidy',
        image: '/user-cover-1.png',
        rating: 4.5,
        learnersCount: 222,
        socialMedia: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
    },
    {
        name: 'john kinidy',
        image: '/user-cover-2.png',
        rating: 4.5,
        learnersCount: 222,
        socialMedia: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
    },
    {
        name: 'john kinidy',
        image: '/user-cover-1.png',
        rating: 4.5,
        learnersCount: 222,
        socialMedia: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
    },
    {
        name: 'john kinidy',
        image: '/user-cover-4.png',
        rating: 4.5,
        learnersCount: 222,
        socialMedia: {
            instagram: '#',
            facebook: '#',
            twitter: '#'
        }
    }
];

export default function Team() {
    return (
        <div className="bg-white py-4 md:px-28 my-10">
            <strong className="text-secondary my-8">Team</strong>
            <h3 className="text-primaryText font-bold text-5xl my-4">Popular Teachers</h3>
            <p className="text-secondText w-9/12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, aliquid! Dolor vitae totam animi aperiam molestiae
            </p>
            <div className="flex md:px-28 mt-10 space-x-8">{teachers.map((teacher, index) => TeacherCard(teacher))}</div>
        </div>
    );
}
interface TeacherCardProps {
    name: string;
    image: string;
    rating: number;
    socialMedia: {
        instagram: string;
        twitter: string;
        facebook: string;
    };
    learnersCount: number;
}

const TeacherCard: React.FC<any> = ({ name, image, rating, socialMedia, learnersCount }: TeacherCardProps) => {
    return (
        <div className="flex-1 rounded-lg shadow-lg max-w-80" key={name}>
            <div className="relative">
                <Image src={image} width={100} height={100} alt="" className="rounded object-cover w-full h-full" />
                <span className="flex items-center mx-auto w-24 absolute bottom-0 right-0">
                    <IoMdStar color="yellow" size={30} />
                    <IoMdStar color="yellow" size={30} />
                    <IoMdStar color="yellow" size={30} />
                    <IoMdStar color="yellow" size={30} />
                    <IoMdStarOutline color="yellow" size={30} />
                </span>
            </div>
            <h4 className="text-primaryText font-bold text-2xl my-4 text-center">{name}</h4>
            <p className="text-secondText text-center">more than {learnersCount} students</p>
            <div className="flex space-x-6 mx-auto my-4 justify-center">
                <a href={socialMedia.instagram}>
                    <FaInstagram size={30} color="#FF7171" />
                </a>
                <a href={socialMedia.facebook}>
                    <FaFacebook size={30} color="#FF7171" />
                </a>
                <a href={socialMedia.twitter}>
                    <FaTwitter size={30} color="#FF7171" />
                </a>
            </div>
        </div>
    );
};
