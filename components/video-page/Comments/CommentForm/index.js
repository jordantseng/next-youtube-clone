import { useState } from 'react';

import TextField from '../../../ui/TextField';
import Button from '../../../ui/Button';

import * as Styled from './styles';

const CommentForm = () => {
  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onCancelButtonClick = () => {
    setIsFocus(false);
  };

  return (
    <form>
      <TextField placeholder="新增公開留言..." onFocus={onFocus} />
      {isFocus && (
        <Styled.Buttons>
          <Button
            style={{ marginRight: '8px' }}
            type="button"
            onClick={onCancelButtonClick}
          >
            取消
          </Button>
          <Button color="primary" type="submit">
            留言
          </Button>
        </Styled.Buttons>
      )}
    </form>
  );
};

export default CommentForm;
