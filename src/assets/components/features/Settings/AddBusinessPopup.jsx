import Popup from "../../common/Elements/Popup";

const AddBusinessPopup = ({ isOpen, closeModal }) => {
    return (
        <Popup isOpen={isOpen} closeModal={closeModal}>
            <p className="text-white">Add Business</p>
            <div className="flex flex-col gap-2 p-2">
                <p className="text-slate-300">
                    If you are looking to setup your business/venue to be used
                    on the application and spread awareness of the deals and
                    events you have. Send us an email with some information and
                    we can get your sorted!
                </p>
                <p className="text-slate-300">Email: andyK@iamabigdog.com.au</p>
            </div>
        </Popup>
    );
};

export default AddBusinessPopup;
