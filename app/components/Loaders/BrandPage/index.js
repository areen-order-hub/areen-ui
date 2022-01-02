import React from 'react';
import { Col, Row, Spinner} from 'reactstrap';

function Loader() {
  return(
    <>
    <div
      className="center-screen"
      >
      <Spinner size="md" color="primary" />
    </div>
    </>
  )
}

export default Loader;