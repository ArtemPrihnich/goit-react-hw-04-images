
import React, { Component } from 'react'
import ImageApi from '../../services/imageSearch'
import Searchbar from 'components/Searchbar/Searchbar'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import Modal from 'components/Modal/Modal'
import '../../styles.css'
import Alert from 'components/Notify/Alert'

export default class App extends Component {
  state = {
    page: 1,
    input: '',
    responce: null,
    storage: null,
    loading: false,
    error: null,
    openModal: false,
    modalContent: {
      largeImageURL: '',
      tags: ''
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { input, page } = this.state
    if (prevState.input !== input || prevState.page !== page) {
      this.setState({ loading: true })
      try {
        const responci = await ImageApi.fetchImages(input, page)
        return this.setState((prevState) => {
          return {
            responce: [...prevState.responce, ...responci?.data.hits],
            storage: responci?.data
          }
        })
      } catch (error) {
        return this.setState({ error })
      } finally { this.setState({ loading: false }) }
    }
  }

  handleFormSubmit = (inputValue) => {
    const { input } = this.state
    if (inputValue === input) {
      return
    }
    this.setState({
      page: 1,
      input: inputValue,
      responce: []
    })
  }

  handleBtnClick = () => {
    const { page } = this.state
    this.setState({
      page: page + 1,
    })

  }

  onOpen = (modalContent) => {
    this.setState({
      openModal: true,
      modalContent
    })
  }

  onClose = () => {
    this.setState({
      openModal: false,
      modalContent: {
        largeImageURL: '',
        tags: ''
      }
    })
  }

  render() {
    const { openModal, modalContent, loading, error, responce, storage } = this.state
    const { onClose, handleFormSubmit, onOpen, handleBtnClick } = this
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
        {responce?.length === 0 && !loading && !error && <Alert />}
      </div>
    )
  }
}


// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
