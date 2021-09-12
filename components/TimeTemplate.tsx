export function TimeTemplate() {
  return (
    <>
      <div className="row">
        <div className="wrapper">
          <div className="value" id="years"></div>
          <div className="unit">years</div>
        </div>
        <div className="wrapper">
          <div className="value" id="months"></div>
          <div className="unit">months</div>
        </div>
        <div className="wrapper">
          <div className="value" id="days"></div>
          <div className="unit">days</div>
        </div>
      </div>
      <div className="row">
        <div className="wrapper">
          <div className="value" id="hours"></div>
          <div className="unit">hours</div>
        </div>
        <div className="wrapper">
          <div className="value" id="minutes"></div>
          <div className="unit">minutes</div>
        </div>
        <div className="wrapper">
          <div className="value" id="seconds"></div>
          <div className="unit">seconds</div>
        </div>
      </div>
    </>
  );
}
