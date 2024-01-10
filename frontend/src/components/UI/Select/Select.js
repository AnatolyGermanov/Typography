import React from 'react'
import ReactSelect from 'react-select'

import styles from './Select.module.css'

const Select = React.forwardRef(
    ({options, OnInputChange, id, ...props}, ref) => {
        return (
            <ReactSelect
                inputId={id}
                className={styles.select}
                options={options}
                onInputChange={OnInputChange}
                {...props}
                ref={ref}
                isSearchable
                isClearable
            />
        )
    }
)

export default Select