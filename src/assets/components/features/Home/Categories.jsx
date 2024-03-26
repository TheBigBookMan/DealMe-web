import { CATEGORIES } from "../../../utils/catitems";
import { Link } from "react-router-dom";

const Categories = () => {
    return (
        <ul className="h-[60px] items-center w-full border-b border-slate-500 px-4 flex gap-8 overflow-x-auto">
            {CATEGORIES.map((cat) => {
                if (cat.name === "None") return;
                return (
                    <Link
                        to={`/deals/type-${cat.name}`}
                        key={cat.name}
                        className="flex flex-col items-center text-red-500"
                    >
                        <cat.icon className="text-2xl" />
                        <p className="text-sm font-bold">{cat.name}</p>
                    </Link>
                );
            })}
        </ul>
    );
};

export default Categories;
