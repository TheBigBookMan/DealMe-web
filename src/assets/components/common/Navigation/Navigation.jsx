import { NAVIGATION } from "./nav.js";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
    const [active, setActive] = useState();
    let { pathname } = useLocation();

    const checkLocationURL = () => {
        pathname = pathname === "/" ? "/home" : pathname;

        if (pathname === "/") pathname = "/home";
        else {
            let parts = pathname.split("/");
            pathname = `/${parts[1]}`;
        }
        setActive(pathname);
    };

    useEffect(() => {
        checkLocationURL();
    }, [pathname]);

    return (
        <div className="h-[60px] w-full border-t border-slate-500 p-2">
            <ul className="flex items-center gap-2 p-1 justify-around">
                {NAVIGATION.map((nav) => (
                    <Link
                        to={`${
                            nav.name === "Home"
                                ? "/"
                                : `/${nav.name.toLowerCase()}`
                        }`}
                        key={nav.name}
                        className={`flex flex-col items-center ${
                            active === `/${nav.name.toLowerCase()}` &&
                            "border bg-slate-100 rounded-xl px-2 font-bold"
                        } `}
                    >
                        <nav.icon className={`text-red-500 text-xl`} />
                        <li className="text-red-500 text-xs">{nav.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;
