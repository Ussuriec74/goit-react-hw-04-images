import { Component } from "react";
import { Overlay, ModalContent, Image } from 'components/Modal/Modal.styled';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

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
    const { modalImage, tags } = this.props;
    return (
      createPortal(
        <Overlay>
          <ModalContent>
            <Image src={modalImage} alt={tags} />
          </ModalContent>
        </Overlay>,
        modalRoot,
      )
    )
  }
}
