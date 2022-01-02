/**
 *
 * StepProgressBar
 *
 */

import React, { memo } from "react";
import cs from "classnames";
import PropTypes from 'prop-types';
import {
  Row,
  UncontrolledTooltip
} from "reactstrap";
// import styled from 'styled-components';
import "./stepProgressBarStyle.scss";

function StepProgressBar({
  className,
  steps = [],
  progress
}) {
  const factor = 99 - (5 * (steps.length -1));
  const style = { 
    width: `${Math.ceil(factor /steps.length) || 0}%`
  }

  const getComponent = () => {
    const components = [];
    for (let index = 1; index < steps.length; index++) {
        components.push( <React.Fragment key={steps[index].id}>
          <div style={style} className={cs("bar mt-3", {
            "bg-primary": progress >= index,
            "border border-primary border-left-0 border-right-0": progress < index
          })}/>
          <div id={`tooltip-${steps[index].id}`} className={cs("circle hover-pointer", {
            "border border-primary": progress <= index,
            "bg-primary progress-complete": progress > index,
          })} onClick={steps[index].onClick} >
            <i className={cs("", {
              "far fa-hourglass text-primary": progress < index,
              "fas fa-check text-secondary": progress > index,
              "fas fa-play text-primary": progress === index
            })}/>
          </div>
          <UncontrolledTooltip
            delay={0}
            placement="top"
            target={`tooltip-${steps[index].id}`}
          >
            {steps[index].label}
          </UncontrolledTooltip>
        </React.Fragment>);
    }
    return components;
  }
  if(steps.length === 0) {
    return <></>
  }

  return <div className={cs(`stepProgressBar ${className}`)}>
    <Row className="justify-content-center">
      <div id={`tooltip-${steps[0].id}`} className={cs("circle hover-pointer", {
       "border border-primary": progress <= 0,
       "bg-primary progress-complete": progress > 0,
      })} onClick={steps[0].onClick}>
        <i className={cs("", {
          "far fa-hourglass text-primary": progress < 0,
          "fas fa-check text-secondary": progress > 0,
          "fas fa-play text-primary": progress === 0
        })}/>
      </div>
      <UncontrolledTooltip
        delay={0}
        placement="top"
        target={`tooltip-${steps[0].id}`}
      >
        {steps[0].label}
      </UncontrolledTooltip>
      {getComponent()}
    </Row>
  </div>;
}

StepProgressBar.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
  })).isRequired
};

export default memo(StepProgressBar);
