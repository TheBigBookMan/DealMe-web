import Popup from "../../common/Elements/Popup";
import { CATEGORIES } from "../../../utils/catitems";
import { FaThumbsUp } from "react-icons/fa6";

// TODO this will be just the type category list

const TypePopup = ({ isOpen, closeModal, selectedType, setFilterType }) => {
    return (
        <Popup isOpen={isOpen} closeModal={closeModal}>
            <p className="text-white">Filter by Type</p>
            <ul className="flex flex-col gap-1 overflow-y-auto h-full my-2 py-2">
                {selectedType &&
                    CATEGORIES.map((cat) => (
                        <li
                            onClick={() => setFilterType(cat.name)}
                            key={cat.name}
                            className={`flex justify-between items-center border rounded-xl p-4 transition ${
                                selectedType === cat.name
                                    ? "border-red-500 bg-red-500"
                                    : "border-red-300"
                            } `}
                        >
                            <div
                                className={`flex gap-2 ${
                                    selectedType === cat.name
                                        ? "text-black font-bold"
                                        : "text-white"
                                }`}
                            >
                                <cat.icon className="text-2xl" />
                                <p className={``}>{cat.name}</p>
                            </div>
                            {selectedType === cat.name && (
                                <FaThumbsUp className="text-black text-2xl" />
                            )}
                        </li>
                    ))}
            </ul>
        </Popup>
    );
};

export default TypePopup;
