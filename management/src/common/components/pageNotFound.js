import { Box } from "@mui/material";
import image from "../../assets/404.png";

const PageNotFound = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80vh",
        }}
      >
        <img src={image} width={500} height={300} />
      </Box>
    </>
  );
};

export default PageNotFound;
