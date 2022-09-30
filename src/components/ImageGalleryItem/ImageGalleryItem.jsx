import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Modal from 'components/Modal/Modal'

export default function ImageGalleryItem({ data }) {
    const { tags, webformatURL } = data
    const [openModal, isOpenModal] = useState(false)
    return (
        <>
            <li className='ImageGalleryItem' onClick={() => isOpenModal(true)}>
                <img className='ImageGalleryItem-image' src={webformatURL} alt={tags} width='200' />
            </li>
            {openModal && <Modal modalClose={() => isOpenModal(false)} data={data} />}

        </>
    )
}

ImageGalleryItem.propTypes = {
    data: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired
    })
}