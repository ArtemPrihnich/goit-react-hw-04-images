import React from 'react'
import { Rings } from 'react-loader-spinner'
import '../../styles.css'
import PropTypes from 'prop-types'

export default function Loader({ visible }) {
    return (
        <Rings
            height="200"
            width="200"
            color="#27e435"
            radius="6"
            wrapperStyle={{}}
            wrapperClass="Loader-style"
            visible={visible}
            ariaLabel="rings-loading"
        />
    )
}

Loader.propTypes = {
    visible: PropTypes.bool.isRequired
}
