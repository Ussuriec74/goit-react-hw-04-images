import { Component } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { toast } from 'react-toastify';
import { SeachBar, SearchForm, SearchFormBtn, SearchFormBtnLabel, SearchFormInput } from 'components/Searchbar/Searchbar.styled';

export class Searchbar extends Component {

  state = {
    searchQuery: "",
  }

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === "") {
      toast('Ne goni');
      return;
    }

    this.props.onFormSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <SeachBar>
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
      </SeachBar>
    )
  }
}