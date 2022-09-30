import React, { Component } from 'react'
import '../../styles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types'

export default class Searchbar extends Component {
    state = {
        input: ''
    }

    handleChange = (e) => {
        const { name, value } = e.currentTarget
        this.setState({ [name]: value })
    };

    handleSubmit = (e) => {
        const { input } = this.state
        e.preventDefault();

        if (input.trim() === '') {
            return Notify.failure('Fill in the input field', { timeout: 1500, clickToClose: true });
        }

        this.props.onSubmit(input)
    }

    render() {
        const { handleSubmit, handleChange } = this
        const { input } = this.state
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
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}