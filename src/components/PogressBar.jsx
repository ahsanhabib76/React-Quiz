import { useRef, useState } from "react";
import classes from "../styles/PogressBar.module.css";
import Button from "./Button";

export default function PogressBar({ next, prev, submit, pogress }) {
  const [toolTip, setToolTip] = useState(false);

  const toolTipRef = useRef();

  const toggleToolTip = () => {
    if (toolTip) {
      setToolTip(false);
      toolTipRef.current.style.display = "none";
    } else {
      setToolTip(true);
      toolTipRef.current.style.left = `calc(${pogress}% - 65px)`;
      toolTipRef.current.style.display = "block";
    }
  };

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={toolTipRef}>
          {pogress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${pogress}%` }}
            onMouseOver={toggleToolTip}
            onMouseOut={toggleToolTip}
          ></div>
        </div>
      </div>

      <Button
        className={classes.next}
        onClick={pogress === 100 ? submit : next}
      >
        <span>{pogress === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
