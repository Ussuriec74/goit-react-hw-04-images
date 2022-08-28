import { Component } from 'react';
import { Box } from 'components/Box';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';




export class App extends Component {

  state = {
    searchQuery: '',
  }
  


  hendleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  }
  
  render() {
    
    return (
      <Box>      
        <Searchbar onFormSubmit={this.hendleFormSubmit}>Gallery</Searchbar>
        <ImageGallery searchQuery={this.state.searchQuery} />
      </Box>
    );
  }
}
