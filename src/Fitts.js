import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';


function FittsTest() {
  const {difficulty} = useParams();
  const history = useHistory();

  if(difficulty === 6){
    history.push('/conclusion')
  }

  const [clickTimes, setClickTimes] = useState([]);
  const target1Ref = useRef(null);
  const target2Ref = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [numClicks, setNumClicks] = useState(0);
  const [offset, setOffset] = useState(0);
  const [numTrials, setNumTrials] = useState(1);

  
  
  let wd = getWidthDist(difficulty,numTrials);

  const [width, setWidth] = useState(wd.width);
  const [distance, setDistance] = useState(wd.distance);

  

  const [timesBetween, setTimesBetween] = useState([]);

  const handleTargetClick = () => {
    setClickTimes((prevTimes) => [...prevTimes, Date.now()]);
    setIsEnabled(!isEnabled);
    setNumClicks(numClicks + 1);
    if (numClicks === 9){
      setNumClicks(0);
      setOffset(offset+10);
      setNumTrials(numTrials+1);
      let wd = getWidthDist(difficulty, numTrials);
      setWidth(wd.width);
      setDistance(wd.distance);

    }
  };

  useEffect(() => {
    if (clickTimes.length >= 2) {
      const timeDifference = clickTimes[clickTimes.length - 1] - clickTimes[clickTimes.length - 2];
      console.log(`Time between clicks: ${timeDifference} ms`);
      setTimesBetween((prev) => [...prev, timeDifference]);
    }
  }, [clickTimes]);

  useEffect(() => {
    if (numTrials === 4){
      history.push(`/summary/${(timesBetween.reduce((acc, val) => acc + val , 0)/timesBetween.length).toFixed(2)}/${difficulty}`);
    }
  },[numTrials])
  
  return (
    <div>
      <p>ID: {difficulty}</p>
      <h2>Click the left button to begin!</h2>
      <h4>Number of Clicks: {numClicks}</h4>
      <div id='container'>
        <div
            ref={target1Ref}
            onClick={handleTargetClick}
            style={{
            width: `${width}px`,
            height: `${width}px`,
            background: 'blue',
            position: 'relative',
            left: `${offset}px`,
            pointerEvents: `${isEnabled ? "auto" : "none"}`,
            cursor: `${isEnabled ? "pointer" : "context-menu"}`,
            }}
        />
        <div
            ref={target2Ref}
            onClick={handleTargetClick}
            style={{
            width: `${width}px`,
            height: `${width}px`,
            background: 'red',
            position: 'relative',
            left: `${offset + distance}px`,
            pointerEvents: `${!isEnabled ? "auto" : "none"}`,
            cursor: `${!isEnabled ? "pointer" : "context-menu"}`,
            }}
        />
      </div>
    </div>
  );
}

function getWidthDist(difficulty,trial){
      let slope = Math.pow(2,difficulty);
      let distance = 150*difficulty+(2*trial+1);
      let width = distance/slope;
  return {width, distance}
}

export default FittsTest;
