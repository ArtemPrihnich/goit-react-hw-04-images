import React from 'react'
import PropTypes from 'prop-types'

export default function ImageGalleryItem({ openModal, data }) {
    const { tags, largeImageURL, webformatURL } = data
    return (
        <>
            <li className='ImageGalleryItem' onClick={() => openModal({ largeImageURL, tags })}>
                <img className='ImageGalleryItem-image' src={webformatURL} alt={tags} width='200' />
            </li>

        </>
    )
}

ImageGalleryItem.propTypes = {
    openModal: PropTypes.func.isRequired,
    data: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired
    })
}