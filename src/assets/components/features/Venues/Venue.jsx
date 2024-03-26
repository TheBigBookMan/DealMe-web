import { Link } from "react-router-dom";

const Venue = ({ data }) => {
    return (
        data && (
            <Link
                to={`/venue/${data.id}`}
                // onClick={() => onClick(data)}
                className="flex justify-between w-full min-h-[60px] p-1 pr-3 items-center border border-red-500 rounded-lg"
            >
                <div className="flex flex-col">
                    <p className="text-white text-xs  max-w-[180px] truncate">
                        {data.name}
                    </p>
                    <div className="flex flex-col">
                        {/* <p className="text-slate-300 text-xs max-w-[180px] truncate">
                                {data.business.name}
                            </p> */}
                        <p className="text-slate-300 text-xs max-w-[180px] truncate">
                            {data.suburb}
                        </p>
                    </div>
                    {/* <p className="text-slate-300 text-xs">{data.date}</p> */}
                </div>
                <p className="text-md text-red-500">
                    {data.deals.length > 0
                        ? `${data.deals.length} ${
                              data.deals.length > 1 ? "Deals" : "Deal"
                          }`
                        : "No Deals"}
                </p>
            </Link>
        )
    );
};

export default Venue;
