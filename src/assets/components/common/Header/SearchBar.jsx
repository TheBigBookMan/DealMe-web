import { useState } from "react";
import Popup from "../Elements/Popup";
import { FaSearch } from "react-icons/fa";
import { FILTER } from "../../../utils/searchfilter";

// TODO THINK THIS WILL USE GOOGLEAPI NEARBY SEARCH (NEW)

const SearchBar = () => {
    const [searchPopup, setSearchPopup] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const [filter, setFilter] = useState();

    return (
        <div className=" w-full">
            <Popup
                closeModal={() => setSearchPopup(false)}
                isOpen={searchPopup}
                height={5}
            >
                <p className="text-white">Search</p>
                <div className="w-full flex flex-col gap-2 pt-1">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full text-white border border-red-500 rounded-lg outline-none bg-black pl-1"
                    >
                        <option value="All">All</option>
                        {FILTER.map((filter) => (
                            <option
                                className="flex justify-between"
                                key={filter.name}
                                value={filter.name}
                            >
                                <p>{filter.name}</p>
                            </option>
                        ))}
                    </select>
                    <input
                        className="outline-none p-1 pl-2 rounded-lg"
                        type="text"
                        placeholder="Feeling hungry?"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                </div>
            </Popup>
            <FaSearch
                className="text-white w-full h-full p-1 pl-2 flex text-2xl"
                onClick={() => setSearchPopup(true)}
            />
        </div>
    );
};

export default SearchBar;
