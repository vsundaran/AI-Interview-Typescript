import { Box } from "@mui/material";
import Not_Found_imgae from "../../../Assects/Images/404_image_2.jpg";

export default function PageNotFound() {
  return (
    <Box>
      <img
        style={{ width: "100%", borderRadius: "8px" }}
        alt="404 Image"
        src={Not_Found_imgae}
      />
    </Box>
  );
}
