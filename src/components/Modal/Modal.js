import { useEffect } from "react";
import PropTypes from 'prop-types';
import { Overlay, ModalContent} from 'components/Modal/Modal.styled';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, children}) => {

  useEffect(() => {
    const onEscKeydown = event => {
     if (event.code === 'Escape') onClose();
   };

    window.addEventListener('keydown', onEscKeydown);
    return () => {
      window.addEventListener('keydown', onEscKeydown);
    }
  })

  const onBackdropClick = event => {
     if (event.currentTarget === event.target) {
       onClose();
     }
   };

  return (
    createPortal(
      <Overlay onClick={onBackdropClick}>
        <ModalContent >
          {children}
        </ModalContent>
      </Overlay>,
      modalRoot,
    )
  )
}

Modal.prototype = {
  onClose: PropTypes.func,
}

