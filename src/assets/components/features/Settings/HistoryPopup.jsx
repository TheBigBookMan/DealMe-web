import Popup from "../../common/Elements/Popup";
import Checkbox from "../../common/Elements/Checkbox";
import { useState } from "react";

const HistoryPopup = ({ isOpen, closeModal }) => {
    const [checkHistory, setCheckHistory] = useState(true);

    return (
        <Popup isOpen={isOpen} closeModal={closeModal}>
            <p className="text-white">History</p>
            <div className="flex flex-col p-2 gap-2">
                <p className="text-slate-300">
                    Turn on/off if you would like us to keep a track of your
                    recently viewed deals, venues and specials.
                </p>
                <Checkbox
                    isChecked={checkHistory}
                    setChecked={() => setCheckHistory(!checkHistory)}
                    label="I want my history tracked"
                />
            </div>
        </Popup>
    );
};

export default HistoryPopup;
