
import React, { useState, useEffect } from 'react'
import ImageApi from '../../services/imageSearch'
import Searchbar from 'components/Searchbar/Searchbar'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import '../../styles.css'
import Alert from 'components/Notify/Alert'

export default function App() {
  const [page, setPage] = useState(1)
  const [input, setInput] = useState('')
  const [responce, setResponce] = useState(null)
  const [storage, setStorage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
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
    setResponce([])
  }

  const handleBtnClick = () => {
    setPage((prevPage) => {
      return prevPage + 1
    })
  }

  return (
    <div className='App'>
      <Searchbar onSubmit={handleFormSubmit} />
      <Loader visible={loading} />
      {responce && <ImageGallery items={responce} onError={error}>
      </ImageGallery>}
      {responce?.length > 0 && storage?.totalHits > responce?.length && <Button onClick={handleBtnClick} />}
      {alert && <Alert />}
    </div>
  )
}
