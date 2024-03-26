import PARMI from "../../../../../public/parmi.png";

const Deal = ({ data, onClick }) => {
    return (
        data && (
            <li
                onClick={() => onClick(data)}
                className="flex justify-between w-full h-[80px] p-1 pr-3 items-center"
            >
                <div className="flex gap-2 ">
                    <img src={PARMI} className="w-[60px] rounded-lg" />
                    <div className="flex flex-col">
                        <p className="text-white text-xs  max-w-[180px] truncate">
                            {data.title}
                        </p>
                        <div className="flex flex-col">
                            <p className="text-slate-300 text-xs max-w-[180px] truncate">
                                {data.business.name}
                            </p>
                            <p className="text-slate-300 text-xs max-w-[180px] truncate">
                                {data.business.suburb}
                            </p>
                        </div>
                        <p className="text-slate-300 text-xs">{data.date}</p>
                    </div>
                </div>
                <p className="text-md text-red-500">
                    {data.price === 0 ? "FREE" : `$${data.price}`}
                </p>
            </li>
        )
    );
};

export default Deal;
