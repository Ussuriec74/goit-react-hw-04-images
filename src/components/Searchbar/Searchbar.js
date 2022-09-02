import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdSearch } from 'react-icons/io';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { SearchBar, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from 'components/Searchbar/Searchbar.styled';

export const Searchbar = ({onFormSubmit}) => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = event => {
    setSearchQuery( event.currentTarget.value.toLowerCase() );
  }

    const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      Notify.warning('Enter search parameters');
      return;
    }

    onFormSubmit(searchQuery);
    setSearchQuery( '' );
  }

  return (
      <SearchBar>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormBtn type="submit" className="button">
            <IoMdSearch size='2em' />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            value={searchQuery}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearchQueryChange}
          />
        </SearchForm>
      </SearchBar>
    )
} 

Searchbar.prototype = {
  onFormSubmit: PropTypes.func.isRequired,
}
