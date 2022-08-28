import { Component } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalContent} from 'components/Modal/Modal.styled';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  static propTypes = {
  onClose: PropTypes.func.isRequired,
};

  componentDidMount() {
    window.addEventListener('keydown', this.onEscKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscKeydown);
  }

  onEscKeydown = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      createPortal(
        <Overlay onClick={this.onBackdropClick}>
          <ModalContent >
            {this.props.children}
          </ModalContent>
        </Overlay>,
        modalRoot,
      )
    )
  }
}
