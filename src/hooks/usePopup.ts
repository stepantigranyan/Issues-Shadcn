import {useCallback, useState} from "react";

const usePopup = (): [boolean, (() => void)] => {
    const [popupOpen, setPopupOpen] = useState(false);

    const toggle = useCallback(() => {
        setPopupOpen((prev) => !prev);
    }, []);

    return [popupOpen, toggle];
};

export default usePopup;