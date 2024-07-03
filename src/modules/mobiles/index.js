import React, { useState } from "react";
import CustomHeaderWithSearchBar from "../../common/components/customHeaderWithSearchBar";
import {
  Box,
  Button,
  Chip,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { MOBILE_ICON } from "../../constants/icons";
import { MOBILE_CARDS } from "../../db/mobiles/cards";
import dayjs from "dayjs";
import AddNewProduct from "./addNewProduct";

const Mobiles = () => {
  const theme = useTheme();
  const isMobileAndTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileCards, setMobileCards] = useState(MOBILE_CARDS || []);
  const [addNewProduct, setAddNewProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openProductModal = (card) => {
    setSelectedProduct(card);
    setAddNewProduct(true);
  };
  const handleSearchInput = (searchedInput) => {
    if (
      searchedInput === "" ||
      searchedInput === null ||
      searchedInput === undefined
    ) {
      setMobileCards(MOBILE_CARDS);
      return;
    }
    setMobileCards(
      MOBILE_CARDS.filter((x) =>
        x.productName
          .toString()
          .toLocaleLowerCase()
          .includes(searchedInput.toString().toLocaleLowerCase())
      )
    );
  };

  return (
    <>
      <CustomHeaderWithSearchBar
        placeholder={"Search Product"}
        searchedInput={handleSearchInput}
        headerText={isMobileAndTablet ? "PTiT" : "Prasad Tech in Telugu"}
        headerIcon={MOBILE_ICON}
        html={
          <Button variant="contained" onClick={() => setAddNewProduct(true)}>
            New
          </Button>
        }
      />
      <Grid container spacing={0} columnGap={1.5} rowGap={1.5}>
        {mobileCards?.map((card, i) => {
          return (
            <Grid
              key={i}
              item
              xs={isMobileAndTablet ? 12 : 3}
              sx={{
                p: 1,
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                border: `0.15px dashed ${theme.palette.primary.main}`,
                minHeight: "155px",
                maxHeight: "155px",
                flexBasis: "24.3% !important",
                position: "relative",
                "&:hover": {
                  background: (theme) =>
                    alpha(
                      theme.palette.primary.main,
                      theme.palette.action.activatedOpacity
                    ),
                },
              }}
              onClick={() => openProductModal(card)}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body1"
                  color={"primary.main"}
                  sx={{ fontWeight: "bold", cursor: "pointer" }}
                >
                  {card?.productName}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  {card.productDetails.isDamaged && (
                    <Chip
                      label="Damaged"
                      sx={{
                        color: theme.palette.error.main,
                        background: "transparent",
                        height: "18px",
                        maxWidth: "90px",
                        border: `1px solid ${theme.palette.error.main}`,
                      }}
                    />
                  )}
                  {card.productDetails.embargoTill && (
                    <Chip
                      label={`${dayjs(card.productDetails.embargoTill).format(
                        "DD-MM-YY HH:MM A"
                      )}`}
                      variant="outlined"
                      color="primary"
                      sx={{
                        height: "18px",
                        marginLeft: "5px",
                        maxWidth: "140px",
                      }}
                    />
                  )}
                </div>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  mt: 1,
                }}
              >
                <Typography variant="body1">Edited By</Typography>
                <Typography variant="body1">
                  {card.videoDetails.editedBy.join(", ")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  mt: 1,
                }}
              >
                <Typography variant="body1">Thumbnail Done By</Typography>
                <Typography variant="body1">
                  {card.videoDetails.thumbnailCreatedBy.join(", ")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  mt: 1,
                }}
              >
                <Typography variant="body1">Category</Typography>
                <Typography variant="body1">{card.category}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  width: "100%",
                  bottom: "7px",
                  left: "0px",
                  position: "absolute",
                  mt: 1,
                }}
              >
                {card.productDetails.isDamaged ? (
                  <Chip
                    label="Returned"
                    sx={{ height: "22px" }}
                    color={card.productDetails.isReturned ? "error" : "default"}
                  />
                ) : (
                  <>
                    <Chip
                      label="Unboxed"
                      sx={{ height: "22px" }}
                      color={card.videoDetails.unboxed ? "success" : "default"}
                    />
                    <Chip
                      label="Reviewed"
                      sx={{ height: "22px" }}
                      color={card.videoDetails.reviewed ? "success" : "default"}
                    />
                    <Chip
                      label="Approved"
                      sx={{ height: "22px" }}
                      color={
                        card.videoDetails.approvedByManager
                          ? "success"
                          : "default"
                      }
                    />
                    <Chip
                      label="Published"
                      sx={{ height: "22px" }}
                      color={
                        card.videoDetails.videoPublished ? "success" : "default"
                      }
                    />
                  </>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {addNewProduct && (
        <AddNewProduct
          closeAddNewProduct={() => {
            setAddNewProduct(false);
            setSelectedProduct(null);
          }}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

export default Mobiles;
