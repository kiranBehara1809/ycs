import { Box } from "@mui/material";
import image from "../../assets/404.png";

const PageNotFound = (props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: props?.boxHeight || "80vh",
        }}
      >
        <img src={image} width={props?.width || 500} height={props?.height || 300} />
      </Box>
    </>
  );
};

export default PageNotFound;
