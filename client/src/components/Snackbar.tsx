import S from "@material-ui/core/Snackbar";
import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useMessages } from '../context/MessagesContext';

const Snackbar: React.FC<{}> = () => {
  const {hideMessage, currentMessage} = useMessages();
  return (
    <S
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={Boolean(currentMessage)}
      autoHideDuration={4000}
      onClose={hideMessage}
    >
      <MuiAlert severity={currentMessage?.type} elevation={6} variant="filled">
        {currentMessage?.text}
      </MuiAlert>
    </S>
  );
};

export default Snackbar;
