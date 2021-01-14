import S from "@material-ui/core/Snackbar";
import React, { useEffect, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";

interface ISnackbarProps {
  message: string;
  type: "error" | "success";
}

const Snackbar: React.FC<ISnackbarProps> = (props) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent) => {
    setOpen(false);
  };

  return (
    <S
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <MuiAlert severity={props.type} elevation={6} variant="filled">
        {props.message}
      </MuiAlert>
    </S>
  );
};

export default Snackbar;
