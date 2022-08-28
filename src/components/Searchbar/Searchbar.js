import { Component } from 'react';
import PropTypes from 'prop-types';
import { IoMdSearch } from 'react-icons/io';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { SearchBar, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {

  state = {
    searchQuery: "",
  }

  static propTypes = {
    onSubmit: PropTypes.func,
    };

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === "") {
      Notify.warning('Enter search parameters');
      return;
    }

    this.props.onFormSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit" className="button">
            <IoMdSearch size='2em' />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            value={this.state.searchQuery}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchQueryChange}
          />
        </SearchForm>
      </SearchBar>
    )
  }
}
