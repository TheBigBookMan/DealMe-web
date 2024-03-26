const Checkbox = ({ isChecked, setChecked, label }) => {
    return (
        <div className="flex gap-2">
            <input
                className="h-6 w-6 rounded-xl"
                type="checkbox"
                checked={isChecked}
                onChange={setChecked}
            />
            <p className="text-slate-300 text-lg">{label}</p>
        </div>
    );
};

export default Checkbox;
