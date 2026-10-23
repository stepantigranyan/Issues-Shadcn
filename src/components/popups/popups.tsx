import Teleport from "@/components/shared/Teleport.tsx";
import {type JSX, type FC, useRef, memo} from "react";

import useOutsideClick from "@/hooks/useOutsideClick.ts";

export interface IPopupProps {
    onCancel: () => void;
    children: JSX.Element[] | JSX.Element;
}

const Popup: FC<IPopupProps> = ({children, onCancel}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideClick(wrapperRef, onCancel);
    return (
        <Teleport target="root-modal">
                <div className={'h-screen w-full backdrop-blur-sm flex items-center justify-center absolute top-0 left-0 z-100'}>
                    <div className="p-10 min-w-100 bg-white z-100 border border-gray-200 border-solid" ref={wrapperRef}>
                        {children}
                    </div>
                </div>
        </Teleport>
    );
};

export default memo(Popup);