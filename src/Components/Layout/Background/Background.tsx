import "./Background.css";

function Background(): JSX.Element {
  return (
    <div className="background">
      <div className="sky div"></div>
      <div className="sand div"></div>
      <div className="wet-sand div"></div>
      <div className="sea div">
        <div className="seafoam div"></div>
      </div>
      {/* <div className="palm-tree div">
                <div className="trunk div"></div>
                <div className="leaves div">
                    <div className="leaves-1 div"></div>
                    <div className="leaves-2 div"></div>
                    <div className="leaves-3 div"></div>
                </div>
            </div> */}
      <div className="sand-front div"></div>
    </div>
  );
}

export default Background;
