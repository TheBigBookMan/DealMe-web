import Popup from "../../common/Elements/Popup";
import PARMI from "../../../../../public/parmi.png";
import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";

const DealPopup = ({ isOpen, closeModal, data }) => {
    return (
        <Popup isOpen={isOpen} closeModal={closeModal} height={5}>
            <p className="text-red-500 truncate text-xl w-full pr-4 font-bold">
                {data.title}
            </p>
            <div className="flex flex-col justify-between items-center w-full h-full gap-2 pb-2">
                <div className="flex flex-col items-center w-full h-full p-2 gap-2  overflow-y-auto">
                    <img src={PARMI} className="w-full rounded-xl" />
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-white text-xl">
                                        ${data.price}
                                    </p>
                                    <p className="text-white">{data.date}</p>
                                </div>
                                <p className="font-bold text-red-500 text-xl">
                                    {`${data.business.name}, ${data.business.suburb}`}
                                </p>
                                <div className="flex text-sm">
                                    <p className="text-red-500">
                                        {data.startTime} -{" "}
                                    </p>
                                    <p className="text-red-500">
                                        {data.endTime}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-white text-sm ">
                            {data.description}
                        </p>
                    </div>
                </div>
                <Link
                    to={`/venue/${data.businessId}`}
                    className="bg-red-500 w-[180px] h-[30px] rounded-xl flex items-center justify-center gap-4 text-white font-bold text-lg"
                >
                    <p>To Venue</p>
                    <FaArrowRightToBracket />
                </Link>
            </div>
        </Popup>
    );
};

export default DealPopup;
