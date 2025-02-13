import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

type LogoutConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const LogoutConfirmModal = ({
  open,
  onClose,
  onLogout,
}: LogoutConfirmModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to log out?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          size="small"
          color="primary"
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          size="small"
          onClick={onLogout}
          color="error"
          variant="contained"
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmModal;
