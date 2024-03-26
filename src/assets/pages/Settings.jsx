import { SETTINGS } from "../components/features/Settings/settingslist";
import AddBusinessPopup from "../components/features/Settings/AddBusinessPopup";
import HistoryPopup from "../components/features/Settings/HistoryPopup";
import LocationPopup from "../components/features/Settings/LocationPopup";
import LanguagePopup from "../components/features/Settings/LanguagePopup";
import { useState } from "react";

// TODO list of settings- language can change language, history can turn on/off if want history tracked in local storage, add business can be info to sign up your business to be part of it, location distance to set a distance you want to show up on maps etc

const Settings = () => {
    const [addBusinessPopup, setAddBusinessPopup] = useState(false);
    const [historyPopup, setHistoryPopup] = useState(false);
    const [locationPopup, setLocationPopup] = useState(false);
    const [languagePopup, setLanguagePopup] = useState(false);

    const openPopup = (name) => {
        name = name.toLowerCase();
        if (name === "language") {
            setLanguagePopup(true);
        } else if (name === "location distance") {
            setLocationPopup(true);
        } else if (name === "history") {
            setHistoryPopup(true);
        } else if (name === "add business") {
            setAddBusinessPopup(true);
        }
    };

    return (
        <div className="flex flex-col w-full h-full p-2 overflow-y-auto">
            <AddBusinessPopup
                isOpen={addBusinessPopup}
                closeModal={() => setAddBusinessPopup(false)}
            />
            <HistoryPopup
                isOpen={historyPopup}
                closeModal={() => setHistoryPopup(false)}
            />
            <LocationPopup
                closeModal={() => setLocationPopup(false)}
                isOpen={locationPopup}
            />
            {/* <LanguagePopup
                closeModal={() => setLanguagePopup(false)}
                isOpen={languagePopup}
            /> */}

            <ul className="flex flex-col gap-2 w-full h-full overflow-y-auto">
                {SETTINGS.map((set) => (
                    <li
                        onClick={() => openPopup(set.name)}
                        key={set.name}
                        className="flex justify-between border border-red-500 rounded-xl p-3"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-3 text-red-500 items-center">
                                <set.icon className="text-3xl" />
                                <p className="text-xl">{set.name}</p>
                            </div>
                            <p className="text-sm text-slate-200">
                                {set.description}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Settings;
