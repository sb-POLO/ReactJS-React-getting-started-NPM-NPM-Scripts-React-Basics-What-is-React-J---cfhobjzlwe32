import React from 'react'

export default function Select(props) {
    return (
        <select data-testid='gender'>
            {props.options.map((items, index) => {
                return (
                    <option
                        key={index}
                        value={items.valueText}>
                        {items.text}
                    </option>
                )
            })}
        </select>

    )
}