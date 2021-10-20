import React, { forwardRef } from 'react'

import './style.css'

const Input = ({ isOpen, searchValue, handleOnChange, toggleSearchInput }, ref) => {
    return (
        <div
            className={isOpen ? 'search-ip-container rounded h-100 open' : 'search-ip-container rounded h-100'}
        >
            <input
                ref={ref}
                type='search'
                value={searchValue}
                className='h-100 search-ip-box bg-white rounded'
                placeholder='Search'
                onChange={handleOnChange}
            />
            <span className='search-ip-button' onClick={toggleSearchInput}>
                <span className='search-ip-icon'></span>
            </span>
        </div>
    )
}

const SearchInput = forwardRef(Input)

export default SearchInput