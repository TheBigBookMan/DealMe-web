import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaHistory } from "react-icons/fa";
import { useEffect, useState } from "react";

// TODO can have the search bar actually the search icon and then have history and favourites in header as well

const Header = () => {
    const [active, setActive] = useState();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname) {
            setActive(pathname);
        }
    }, [pathname]);

    return (
        <div className="w-full h-[40px] p-2">
            <div className="flex gap-2 items-center justify-between">
                <p className="text-red-500 text-2xl font-bold">DealMe</p>
                <div className="flex gap-4 items-center">
                    <Link
                        to="/history"
                        className={` p-1 ${
                            active === "/history" &&
                            "border border-white bg-white rounded-xl"
                        }`}
                    >
                        <FaHistory className="text-red-500 text-2xl" />
                    </Link>
                    <Link
                        to="/favourites"
                        className={` p-1 ${
                            active === "/favourites" &&
                            "border border-white bg-white rounded-xl"
                        }`}
                    >
                        <FaHeart className="text-red-500 text-2xl" />
                    </Link>
                    <SearchBar />
                </div>
            </div>
        </div>
    );
};

export default Header;
