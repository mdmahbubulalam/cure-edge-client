import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ReviewsIcon from "@mui/icons-material/Reviews";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PendingIcon from "@mui/icons-material/Pending";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const DashBoard = (props) => {
  //const icon = [<MeetingRoomIcon/>,<AttachMoneyIcon/>,<ReviewsIcon/>,<PendingIcon/>,<DirectionsWalkIcon/>,<DoneAllIcon/>]
  //console.log(icon);
  const { title, total, bgColor, icon } = props.content;
  return (
    <Card
      sx={{
        minWidth: 275,
        textAlign: "center",
        border: 0,
        boxShadow: 0,
        color: "#ffffff",
        p: 3,
        backgroundColor: `${bgColor}`,
      }}
    >
     

      <CardContent>
        <Typography
          variant="h6"
          textTransform="uppercase"
          fontWeight="600"
          component="div"
          sx={{display:'flex', justifyContent:'space-between'}}
        >
          {title}
          {icon}
        </Typography>
        <Typography
          variant="h6"
          textTransform="uppercase"
          fontWeight="600"
          component="div"
          sx={{display:'flex', justifyContent:'space-between'}}
        >
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashBoard;
