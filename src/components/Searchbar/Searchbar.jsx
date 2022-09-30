import React, { useState } from 'react'
import '../../styles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types'

export default function Searchbar({ onSubmit }) {
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        const { value } = e.currentTarget
        return setInput(value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (input.trim() === '') {
            return Notify.failure('Fill in the input field', { timeout: 1500, clickToClose: true });
        }

        onSubmit(input)
    }

    return (
        <header className="Searchbar">
            <form className='SeacrhForm' onSubmit={handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                    className="SearchForm-input"
                    name='input'
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={input}
                    onChange={handleChange}
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
