import { IoCloseSharp } from "react-icons/io5";

const Popup = ({ children, closeModal, isOpen, height }) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={closeModal}
                >
                    <div
                        className={`relative bg-slate-900 border border-red-500 p-3 rounded-xl w-4/5 md:w-[400px] ${
                            height === 5 ? "h-5/6" : "h-4/6"
                        } md:h-[600px] pb-8`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-0 right-0 m-2 text-lg font-bold h-[20px]"
                            onClick={closeModal}
                        >
                            <IoCloseSharp className="text-3xl text-red-500" />
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
