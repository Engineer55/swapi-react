import React, { useState, useEffect } from "react";
import { Menu, Pagination, Info, Modal } from "../components";

export const Content = ({ subMenu, onPageClick, currentPage, totalPages, isLoadingSubMenu }) => {
    const [currentItem, setCurrentItem] = useState()
    const [itemInfo, setItemInfo] = useState()
    const [isLoadingInfo, setIsLoadingInfo] = useState(false)
    const [modalInfo, setModalInfo] = useState()

    const getItemInfo = (url, modal=false) => {
        setIsLoadingInfo(true)
        fetch(url)
            .then(response => response.json())
            .then(response => {
                response = Object.entries(response).reduce((acc, item) => {
                    return [...acc, { term: item[0], definition: item[1] }]
                }, [])
                if(modal){
                    return setModalInfo(response) 
                }
                setItemInfo(response)
            })
    }

    useEffect(() => {
        if (itemInfo || modalInfo) {
            setIsLoadingInfo(false)
        }
    }, [itemInfo, modalInfo])

    if (!subMenu) {
        return null;
    }

    return (
        <div className="site__content">
            {isLoadingSubMenu ? <span><strong>Loading...</strong></span> :
                <>
                    <Menu
                        menu={subMenu}
                        onItemClick={(value) => {
                            setCurrentItem(value)
                            getItemInfo(value)
                        }}
                        currentItem={currentItem}
                    />
                    {totalPages > 1 && <Pagination
                        totalPages={totalPages}
                        onPageClick={onPageClick}
                        currentPage={currentPage}
                    />}
                </>
            }
            {itemInfo && <Info
                itemInfo={itemInfo}
                getItemInfo={getItemInfo}
                isLoadingInfo={isLoadingInfo}
            />}
            <Modal
                itemInfo={modalInfo}
                getItemInfo={getItemInfo}
                setModalInfo={setModalInfo}
            />
        </div>
    )
}
