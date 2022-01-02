/**
 *
 * StartMeeting
 *
 */

import React, { memo } from "react";
import qs from "query-string";
import Zoom from "../Zoom";
import "./startMeetingStyle.scss";

function StartMeeting({ location }) {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    const { link, isHost } = qs.parse(location.search);
    if(!link) {
      history.push('/events');
    }
    else {
      setState({ link, isHost});
    }
  }, []);

  return <div className="startMeeting">
    {
      state.link &&
      <Zoom
        meetingId={state.link}
        isHost={state.isHost}
        launchOnLoad={true}
      />
    }
  </div>;
}

StartMeeting.propTypes = {};

export default memo(StartMeeting);
