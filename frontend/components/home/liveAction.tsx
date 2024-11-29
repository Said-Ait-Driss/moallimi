import Image from "next/image";
import { MdArrowForwardIos } from "react-icons/md";

export default function LiveAction() {
    return(
        <div className="flex bg-lightPrimary py-4">
            <div className="flex-1 p-12 ">
                <Image src="/thumb-concept.png" width={500} height={900} alt="thumb-concept" className="mx-auto mt-48" />
            </div>
            <div className="flex-1">
                <div className="w-48 p-2 bg-primary rounded mt-48"></div>
                <h3 className="text-primaryText text-5xl font-bold py-4 mt-12">Video in Live Action</h3>
                <p className="text-gray-500 text-lg my-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos saepe quos ea molestiae eaque alias illo error nostrum ad ipsam modi, ducimus nihil, commodi. </p>
                <a href="#" className="flex text-primary my-4 space-x-1 items-center">
                    Learn More
                    <MdArrowForwardIos/>
                </a>
            </div>
        </div>
    )
}