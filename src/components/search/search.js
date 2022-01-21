import React, { useState, useEffect } from "react";
import { Button } from "..";
import style from './style.css'

export const Search = ({ categoryList, foundItem }) => {
    const [style, setStyle] = useState('site__search__select--hide')
    const [selectedCategory, setSelectedCategory] = useState()
    const [searchingValue, setSearchingValue] = useState()
    //https://swapi.dev/api/people/?search=
    // console.log(`searchingValue`, searchingValue)

    // const searching=()=>{
    //     fetch(`https://swapi.dev/api/${selectedCategory}/?search=${searchingValue}`)
    //     .then(response=>response.json())
    //     .then(response=>foundItem(response))
    // }

    useEffect(() => {
        if (categoryList) {
            setSelectedCategory(categoryList[0].name)
        }
    }, [categoryList])

    if (!categoryList) {
        return null
    }

    const choiceCategory = ({ i }) => {
        setStyle('site__search__select--hide')
        setSelectedCategory(i.name)
    }

    return (
        <div className="site__search">
            <input
                className='site__search-input'
                placeholder='Search'
                onInput={(e) => setSearchingValue(e.target.value)}
            />
            <div
                className='site__search__category'
                onClick={() => setStyle('site__search__select')}
            >{selectedCategory}
            </div>
            <div
                className={style}
                onMouseLeave={() => setStyle('site__search__select--hide')}
            >
                {categoryList.map(i => <div
                    key={i.name}
                    className='site__search__select__item'
                    onClick={() => choiceCategory({ i })}
                >{i.name}
                </div>)
                }
            </div>
            <Button
                text='search'
                onClick={() => foundItem(`https://swapi.dev/api/${selectedCategory}/?search=${searchingValue}`)}
            />
        </div>
    )
}