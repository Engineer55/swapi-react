import { useState } from "react";
import { Button } from "../index";

export const Menu = ({ menu, category, onItemClick, currentItem }) => {

    if (!menu) {
        return null;
    }

    return (
        <div className="site__main-menu">
            {menu.map(i => (
                <Button
                    key={i.url}
                    text={i.name}
                    onClick={() => {
                        onItemClick(i.url)
                    }}
                    isActive={i.url === category || i.url === currentItem}
                />
            ))}
        </div>
    )
}




