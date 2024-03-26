import Popup from "../../common/Elements/Popup";

const LanguagePopup = ({ isOpen, closeModal }) => {
    return (
        <Popup isOpen={isOpen} closeModal={closeModal}>
            <p className="text-white">Language</p>
            <div className="flex flex-col"></div>
        </Popup>
    );
};

export default LanguagePopup;
