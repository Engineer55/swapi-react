import React, { useState, useEffect } from "react";
import { Button } from "..";

export const Accordion = ({ links, getItemInfo }) => {
    const [itemList, setItemList] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const isItemLoaded = links.length === itemList.length

    const getNameItems = () => {
        setIsFetching(true)
        links.map(url => {
            fetch(url)
                .then(response => response.json())
                .then(response => {
                    setItemList((prevState) => ([...prevState, { name: response.name || response.title, url: response.url }]))
                })
        })
    }

    useEffect(() => {
        if (isItemLoaded) {
            setIsFetching(false)
        }
    }, [itemList])

    const onClick = () => {
        !itemList.length ? getNameItems() : setItemList([])
    }

    if (!links.length) {
        return <span>n/a</span>
    }

    return (
        <>
            <Button
                text={isItemLoaded ? 'Hide' : 'Show'}
                onClick={onClick}
            />
            {isFetching && <span><strong>Loading...</strong></span>}
            {!isFetching && itemList.map(i => <button
                key={i.url}
                onClick={() => {
                    getItemInfo(i.url, true)
                }}>{i.name}</button>)
            }
        </>
    )
}