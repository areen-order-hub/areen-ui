/**
 *
 * Zoom
 *
 */

import React, { memo } from "react";
import PropTypes from 'prop-types';
import { Button } from "reactstrap";
import { useCookies } from "react-cookie";
import Request from "utils/request";
import * as selectors from "./selectors";
import Loader from "../Loaders/BrandPage";

import "./zoomStyle.scss";

function Zoom({ meetingId, isHost = 0, launchOnLoad = false }) {
  
  const [cookie] = useCookies(['user']);
  
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://source.zoom.us/zoom-meeting-1.9.1.min.js";
    script.async = false;
    document.body.appendChild(script);

    const styleLink = document.createElement("link");
    styleLink.href = "https://source.zoom.us/1.9.1/css/bootstrap.css"
    styleLink.type = "text/css"
    document.body.appendChild(styleLink);

    const selectStyle = document.createElement("link");
    selectStyle.href = "https://source.zoom.us/1.9.1/css/react-select.css"
    selectStyle.type = "text/css"
    document.body.appendChild(selectStyle);

    if(launchOnLoad) {
      script.addEventListener("load", () => startMeeting());
    }
    return () => {
      document.body.removeChild(script);
      hideMeeting();
    }
  }, []);

  const displayMeeting = () => {
    document.getElementById("zmmtg-root").style.display = "block";
    document.getElementById("sidenav").style.display = "none";
  }

  const hideMeeting = () => {
    document.getElementById("zmmtg-root").style.display = "none";
    document.getElementById("sidenav").style.display = "block";
  }
 

  const startMeeting = () => {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av'); 
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    displayMeeting();
    Request({
      url: `/api/zoom/token?meetingId=${meetingId}&role=${isHost}`,
      method: "GET"
    })
    .then(( { data : {
      signature,
      password,
      apiKey
    }}) => {
      ZoomMtg.init({
        leaveUrl: "/events",
				isSupportAV: true,
        success: function () {
          ZoomMtg.join({
            signature,
            apiKey,
						meetingNumber: meetingId,
						userName: selectors.userId(cookie),
						passWord: password,
            error(res) {
              console.log(res);
            }
          });
        }
      });
    });
  }

  return <div className="zoom mx-3 mx-md-4 ml-lg-7">
    {
      launchOnLoad ?
        <Loader />
        :
        <div>
          <Button
            type="button"
            color="primary"
            onClick={() => startMeeting()}
          >
            Start
          </Button>
        </div>
    }
  </div>;
}

Zoom.propTypes = {
  meetingId: PropTypes.string.isRequired,
  isHost: PropTypes.oneOf(0, 1),
  launchOnLoad: PropTypes.bool.isRequired
};

export default memo(Zoom);
