import { Component } from 'react';
import { Box } from 'components/Box';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';




export class App extends Component {

  state = {
    searchQuery: '',
    
    loading: false,
  }
  


  hendleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  }
  


  render() {
    
    return (
      <Box>
        {this.state.loading && <h2>Loading...</h2>}
        <Searchbar onFormSubmit={this.hendleFormSubmit}>Gallery</Searchbar>
        <ImageGallery searchQuery={this.state.searchQuery} />
         
        <ToastContainer />
      </Box>
    );
  }
}
