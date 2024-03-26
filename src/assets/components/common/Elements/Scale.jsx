const Scale = ({ value, handleChange, scale, min, max }) => {
    return (
        <div className="flex flex-col items-center">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                className="w-full"
            />
            <span className="mt-2 text-lg text-white">
                {value} {scale}
            </span>
        </div>
    );
};

export default Scale;
