import react from "react";

export const Button = ({ text, onClick, isActive }) => {

    return (
        <>
            <button
                onClick={onClick}
                style={{ backgroundColor: isActive && "rgb(60, 245, 245)"}}
            >{text}</button>
        </>
    )
}

