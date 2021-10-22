import React from 'react'

import './style.css'

const Select = ({ handleOnChange, filterValue, optionList }) => {
    return (
        <select className='h-100 w-100 rounded border-0 border-bottom select-component' onChange={handleOnChange} value={filterValue}>
            {optionList.map(category => {
                return (
                    <option
                        key={category.id}
                        value={category.name.toLowerCase()}
                    >
                        {category.name}
                    </option>)
            })}
        </select>
    )
}

export default Select