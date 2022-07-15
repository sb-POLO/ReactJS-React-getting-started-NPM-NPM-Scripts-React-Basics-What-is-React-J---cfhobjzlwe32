import React from 'react'

export default function Input(props) {
    return (
        <div>
            <input
                id={props.id}
                name={props.name}
                data-testid={props.testId}
                type={props.type}
                placeholder={props.placeholderText}
            />
        </div>

    )
}