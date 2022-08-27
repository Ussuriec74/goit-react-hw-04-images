import { Component } from 'react';
import { BiSearch } from 'react-icons';
import { toast } from 'react-toastify';

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
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            value={this.state.searchQuery}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchQueryChange}
          />
        </form>
      </header>
    )
  }
}