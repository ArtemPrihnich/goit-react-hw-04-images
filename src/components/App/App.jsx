
import React, { Component } from 'react'
import ImageApi from '../../services/imageSearch'
import Searchbar from 'components/Searchbar/Searchbar'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import Modal from 'components/Modal/Modal'
import '../../styles.css'
import Alert from 'components/Notify/Alert'
import { useState } from 'react'
import { useEffect } from 'react'

// import React from 'react'

export default function App() {
  const [page, setPage] = useState(1)
  const [input, setInput] = useState('')
  const [responce, setResponce] = useState(null)
  const [storage, setStorage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [openModal, isOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState({
    largeImageURL: '',
    tags: ''
  })
  const [alert, isAlert] = useState(false)

  useEffect(() => {
    if (input === '') {
      return
    }
    setLoading(true)
    async function foo() {
      try {
        const res = await ImageApi.fetchImages(input, page)
        setResponce((prevResp) => {
          return [...prevResp, ...res?.data.hits]
        })
        setStorage(() => {
          return res?.data
        })
        isAlert(() => {
          if (res.data.hits.length === 0) {
            return true
          }
          return false
        })
      } catch (error) {
        setError(error)
        console.log(!error)
      } finally { setLoading(false) }
    }
    foo()
  }, [input, page])

  const handleFormSubmit = (inputValue) => {
    if (inputValue === input) {
      return
    }
    setPage(1)
    setInput(inputValue)
    console.log(inputValue)
    setResponce([])
  }

  const handleBtnClick = () => {
    setPage((prevPage) => {
      return prevPage + 1
    })
  }

  const onOpen = (modalContent) => {
    isOpenModal(true)
    setModalContent({
      largeImageURL: modalContent.largeImageURL,
      tags: modalContent.tags
    })
  }

  const onClose = () => {
    isOpenModal(false)
    setModalContent({
      largeImageURL: '',
      tags: ''
    })
  }

  return (
    <div className='App'>
      {openModal && <Modal modalClose={onClose}>
        <img src={modalContent.largeImageURL} alt={modalContent.tags} />
      </Modal>}
      <Searchbar onSubmit={handleFormSubmit} />
      <Loader visible={loading} />
      {responce && <ImageGallery items={responce} openModal={onOpen} onError={error}>
      </ImageGallery>}
      {responce?.length > 0 && storage?.totalHits > responce?.length && <Button onClick={handleBtnClick} />}
      {alert && <Alert />}
    </div>
  )
}


// export default class App extends Component {
//   state = {
//     page: 1,
//     input: '',
//     responce: null,
//     storage: null,
//     loading: false,
//     error: null,
//     openModal: false,
//     modalContent: {
//       largeImageURL: '',
//       tags: ''
//     }
//   }

//   async componentDidUpdate(prevProps, prevState) {
//     const { input, page } = this.state
//     if (prevState.input !== input || prevState.page !== page) {
//       this.setState({ loading: true })
//       try {
//         const responci = await ImageApi.fetchImages(input, page)
//         return this.setState((prevState) => {
//           return {
//             responce: [...prevState.responce, ...responci?.data.hits],
//             storage: responci?.data
//           }
//         })
//       } catch (error) {
//         return this.setState({ error })
//       } finally { this.setState({ loading: false }) }
//     }
//   }

//   handleFormSubmit = (inputValue) => {
//     const { input } = this.state
//     if (inputValue === input) {
//       return
//     }
//     this.setState({
//       page: 1,
//       input: inputValue,
//       responce: []
//     })
//   }

//   handleBtnClick = () => {
//     const { page } = this.state
//     this.setState({
//       page: page + 1,
//     })

//   }

//   onOpen = (modalContent) => {
//     this.setState({
//       openModal: true,
//       modalContent
//     })
//   }

//   onClose = () => {
//     this.setState({
//       openModal: false,
//       modalContent: {
//         largeImageURL: '',
//         tags: ''
//       }
//     })
//   }

//   render() {
//     const { openModal, modalContent, loading, error, responce, storage } = this.state
//     const { onClose, handleFormSubmit, onOpen, handleBtnClick } = this
//     return (
      // <div className='App'>
      //   {openModal && <Modal modalClose={onClose}>
      //     <img src={modalContent.largeImageURL} alt={modalContent.tags} />
      //   </Modal>}
      //   <Searchbar onSubmit={handleFormSubmit} />
      //   <Loader visible={loading} />
      //   {responce && <ImageGallery items={responce} openModal={onOpen} onError={error}>
      //   </ImageGallery>}
      //   {responce?.length > 0 && storage?.totalHits > responce?.length && <Button onClick={handleBtnClick} />}
      //   {responce?.length === 0 && !loading && !error && <Alert />}
      // </div>
//     )
//   }
// }

