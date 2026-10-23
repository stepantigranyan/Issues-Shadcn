import {createPortal} from "react-dom";
import {type FC, type JSX} from "react";

export interface TeleportProps {
    children: JSX.Element;
    target: string;
}

const Teleport: FC<TeleportProps> = ({ children, target = 'root-portal' }) => {
    const sidebarContentEl = document.getElementById(target)!;

    return createPortal(
        children,
        sidebarContentEl
    );
};

export default Teleport