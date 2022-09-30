import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import '../../styles.css'
import PropTypes from 'prop-types'

const modalRoot = document.getElementById("modal-root")

export default function Modal({ modalClose, data }) {
    const { tags, largeImageURL } = data
    useEffect(() => {
        document.addEventListener('keydown', closeModal)

        return () => {
            document.removeEventListener('keydown', closeModal)
        }
    })

    const closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === 'Escape') {
            modalClose()
        }
    }

    return createPortal(
        <div className='Overlay' onClick={closeModal}>
            <div className="Modal">
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>,
        modalRoot
    )
}

Modal.propTypes = {
    modalClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    }
    )
}