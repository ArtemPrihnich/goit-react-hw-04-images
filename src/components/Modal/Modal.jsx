import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import '../../styles.css'
import PropTypes from 'prop-types'

const modalRoot = document.getElementById("modal-root")

// import React from 'react'

export default function Modal({ modalClose, children }) {
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
                {children}
            </div>
        </div>,
        modalRoot
    )
}

Modal.propTypes = {
    modalClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}


// export default class Modal extends Component {

//     componentDidMount() {
//         document.addEventListener('keydown', this.closeModal)
//     }

//     componentWillUnmount() {
//         document.removeEventListener('keydown', this.closeModal)
//     }

//     closeModal = ({ target, currentTarget, code }) => {
//         if (target === currentTarget || code === 'Escape') {
//             this.props.modalClose()
//         }
//     }

//     render() {
//         return createPortal(
            // <div className='Overlay' onClick={this.closeModal}>
            //     <div className="Modal">
            //         {this.props.children}
            //     </div>
            // </div>,
            // modalRoot
//         )
//     }
// }

// Modal.propTypes = {
//     modalClose: PropTypes.func.isRequired,
//     children: PropTypes.node.isRequired
// }
