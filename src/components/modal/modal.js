import React from "react";
import style from './style.css'
import { removeDashFromString } from "../../utils/string";
import { Accordion, Button } from '../index'
import { formatDate } from "../../utils/date";
import { BASE_DATE_FORMAT } from "../../utils/date";

export const Modal = ({ itemInfo, getItemInfo, setModalInfo }) => {
    if (!itemInfo) {
        return null
    }

    const formattedDefinition = (value) => {
        if (typeof value === 'object') {
            return <Accordion links={value} getItemInfo={getItemInfo} />
        }

        if (typeof value === 'string' && value.startsWith('https')) {
            return <Accordion links={value.split()} getItemInfo={getItemInfo} />
        }
        if (Date.parse(value)) {
            return formatDate(value, BASE_DATE_FORMAT)
        }
        return String(value)
    }



    return (
        <div className='site__content__modal'>
            <div className='site__content__modal-button'>
                <Button
                    text='close'
                    onClick={() => {
                        setModalInfo()
                    }}
                />
            </div>
            {itemInfo.map(i => {
                if (i.term !== 'url') {
                    return <p
                        key={i.term}
                    >
                        <strong>{removeDashFromString(i.term)}:</strong> {formattedDefinition(i.definition)}
                    </p>
                }
            })}
        </div>
    )
}