import React from 'react'
import '../../styles.css'
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import PropTypes from 'prop-types'

export default function ImageGallery({ items, openModal, onError }) {
    return (
        <ul className="ImageGallery">
            {onError && <li className='Error-mesage' key={onError.message}>{onError.message}</li>}
            {items.map(({ id, webformatURL, tags, largeImageURL }) => {
                return (
                    <ImageGalleryItem key={id} data={({ id, webformatURL, tags, largeImageURL })} openModal={openModal} />
                )
            })}
        </ul>
    )
}

ImageGallery.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ),
    openModal: PropTypes.func.isRequired,
    onError: PropTypes.object,


}