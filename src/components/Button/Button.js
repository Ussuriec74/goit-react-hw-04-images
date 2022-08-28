import PropTypes from 'prop-types';
import { LoadMoreBtn } from "components/Button/Button.styled";

export const Button = ({ handleClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={handleClick}>
      Load more
    </LoadMoreBtn>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};