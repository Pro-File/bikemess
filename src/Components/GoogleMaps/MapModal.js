import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Location from "../../Assests/Location.png";
import GoogleMaps from "./MyGoogleMaps";
import style from "./index.module.less";
import { OutlineButton, SimpleButton } from "../common/Buttons";
import { setGlobalMapAddress } from "../../Redux/Slices/MapSlice";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function MapModal(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [checkOutMapAddress, setCheckOutMapAddress] = useState({
    address: "",
    lat: 24.8607,
    lng: 67.0011,
  });
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const body = (
    <div className={style.mainWrapper}>
      <GoogleMaps
        mapAddress={checkOutMapAddress}
        setMapAddress={setCheckOutMapAddress}
      />
      <div className={style.buttonWrapper}>
        <OutlineButton
          text='Cancel'
          size='large'
          onClick={props.handleClose}
          css={style.outlineBtn}
        />
        <SimpleButton
          type='primary'
          size='large'
          shape='round'
          text='Confirm'
          css={style.simpleBtn}
          onClick={() => {
            dispatch(setGlobalMapAddress(checkOutMapAddress));
            props.handleClose();
          }}
        />
      </div>
    </div>
  );

  return (
    <div>
       <SimpleButton
              type='primary'
              size='small'
              shape='round'
              text='PIN MAP LOCATION'
              onClick={() => props.handleOpen()}
              imageSource={Location}
            />

      <Dialog
        maxWidth={"lg"}
        fullScreen={fullScreen}
        fullWidth={true}
        scroll={"body"}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {"Where is your Bikemess Shop located at ?"}
        </DialogTitle>

        <DialogContent>{body}</DialogContent>
      </Dialog>
    </div>
  );
}
