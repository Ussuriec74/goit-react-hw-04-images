import { LoadMoreBtn } from "components/Button/Button.styled";

export const Button = ({ handleClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={handleClick}>
      Load more
    </LoadMoreBtn>
  );
}