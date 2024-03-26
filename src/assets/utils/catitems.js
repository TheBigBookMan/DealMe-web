import {
    FaDrumstickBite,
    FaCocktail,
    FaHotjar,
    FaPercentage,
} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

export const CATEGORIES = [
    {
        name: "None",
        icon: ImCross,
    },
    {
        name: "Food",
        icon: FaDrumstickBite,
    },
    {
        name: "Drinks",
        icon: FaCocktail,
    },
    {
        name: "Hot",
        icon: FaHotjar,
    },
    {
        name: "Events",
        icon: IoIosPeople,
    },
    {
        name: "Combos",
        icon: IoFastFood,
    },
    {
        name: "Discount",
        icon: MdDiscount,
    },
    {
        name: "Specials",
        icon: FaStar,
    },
    {
        name: "Clearings",
        icon: FaPercentage,
    },
];
