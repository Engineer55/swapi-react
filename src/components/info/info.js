import React, { useState } from "react";
import { Accordion } from "..";
import { removeDashFromString } from "../../utils/string";
import { formatDate } from "../../utils/date";
import { BASE_DATE_FORMAT } from "../../utils/date";

export const Info = ({ itemInfo, getItemInfo, isLoadingInfo }) => {

    const formattedDefinition = (value) => {
        if (typeof value === 'object') {
            return <Accordion links={value} getItemInfo={getItemInfo} />
        }

        if (typeof value === 'string' && value.startsWith('https')) {
            return <Accordion links={value.split()} getItemInfo={getItemInfo} />
        }
        if (Date.parse(value)){
            return formatDate(value, BASE_DATE_FORMAT)
        }
        return String(value)
    }

    return (
        <div className='site__item-info'>
            {isLoadingInfo ? <span><strong>Loading...</strong></span> :
                itemInfo.map(i => {
                    if (i.term !== 'url') {
                        return <p
                            key={i.term}
                        >
                            <strong>{removeDashFromString(i.term)}:</strong> {formattedDefinition(i.definition)}
                        </p>
                    }
                })
            }
        </div>
    )
}