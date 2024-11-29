'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { SET_ROLE } from '@/store/features/auth/authSlice';



export default function Welcome() {

    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch(); 
    const router = useRouter();

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleNavigation = (path:string)=>{
        dispatch(SET_ROLE("teacher"));
        router.push(path)
    }

    return (
        <>
            <div className="flex bg-lightPrimary">
                <div className="flex-1 p-4 ps-28 mt-28">
                    <strong className="text-primary my-8">Best Opportunities</strong>
                    <h3 className="text-primaryText font-bold text-8xl my-8 leading-snug">25K+ QUALIFIED TEACHERS </h3>
                    <p className="text-secondText font-bold my-8">Join us now as a Teacher and expend your profissional opportunities.</p>
                    <p className="text-secondText font-light mb-8">Create your free acount just in one second.</p>
                    <div className="flex space-x-3 my-8">
                        <button onClick={()=>handleNavigation("/auth/register")} className="bg-primary text-white px-7 py-3 rounded-xl hover:bg-primary/90 font-bold flex items-center space-x-3">
                            Join Us Now
                        </button>
                        <button onClick={toggleVisibility} className="text-primary px-7 py-3 hover:text-darkPrimary rounded-xl border border-primary">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="flex-1 p-4 pe-0">
                    <Image src="/teacher.png" alt="moallii teachers" layout="responsive" width={600} height={400} />
                </div>
            </div>
            {isVisible && (
                <div className="bg-lightPrimary p-4 ps-28 text-secondText font-light">
                    Are you passionate about sharing knowledge and making a difference in the lives of students? If so, we invite you to become a part
                    of our dynamic teaching community! By joining us, you will not only have the chance to inspire and educate others but also to
                    enhance your own professional journey. Creating your free account is quick and easy—just a matter of seconds! Once you sign up,
                    you’ll gain access to a wealth of resources, networking opportunities, and professional development tools designed to help you
                    grow as an educator. Whether you’re an experienced teacher looking to broaden your horizons or a newcomer eager to start your
                    teaching career, our platform offers a supportive environment where you can thrive. Connect with fellow educators, share best
                    practices, and explore new teaching methodologies that can elevate your classroom experience. Don’t miss out on this opportunity
                    to expand your professional network and unlock new career possibilities. Join us today and take the first step towards a
                    fulfilling teaching journey!
                </div>
            )}
        </>
    );
}
