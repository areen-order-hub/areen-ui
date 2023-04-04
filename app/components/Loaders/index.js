import React from "react";
import { Spinner } from "reactstrap";

function Loader() {
  return (
    <>
      <div className="center-screen">
        <Spinner size="md" color="primary" />
      </div>
    </>
  );
}

export default Loader;
