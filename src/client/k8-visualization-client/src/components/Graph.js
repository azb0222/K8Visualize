import { Graph, Node } from "react-d3-graph";
import React, { useState, useRef, useEffect } from 'react';
import crd from '../assets/images/k8icons/crd.png'; 

// graph payload (with minimalist structure)
const data = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" },
  ],
};

const generateCustomNode = (node) => {
  return (
    <div>
      <svg width="140" height="140" xmlns="http://www.w3.org/2000/svg">

        {/* Outer Circle */}
        <circle cx="70" cy="70" r="35" fill="rgba(0, 0, 0, 0.3)" />

        {/* Inner Circle */}
        <circle cx="70" cy="70" r="25" fill="rgba(0, 0, 0, 0.8)" />

        {/* Text Overlay */}
        <image href={crd} x="60" y="60" height="20" width="20" />
      </svg>

    </div>
  );
};

// the graph configuration, just override the ones you need
const myConfig = {
  "automaticRearrangeAfterDropNode": false,
  "collapsible": false,
  "directed": false,
  "focusAnimationDuration": 0.75,
  "focusZoom": 1,
  "freezeAllDragEvents": false,
  "height": 400,
  "highlightDegree": 1,
  "highlightOpacity": 0.2,
  "linkHighlightBehavior": true,
  "maxZoom": 8,
  "minZoom": 0.1,
  "nodeHighlightBehavior": true,
  "panAndZoom": false,
  "staticGraph": false,
  "staticGraphWithDragAndDrop": false,
  "width": 800,
  "d3": {
    "alphaTarget": 0.05,
    "gravity": -400,
    "linkLength": 300,
    "linkStrength": 1,
    "disableLinkForce": false
  },
  "node": {
    "size": 1400,
    "viewGenerator": generateCustomNode, 
    "renderLabel": false
  },
  "link": {
    "color": "#d3d3d3",
    "fontColor": "red",
    "fontSize": 10,
    "fontWeight": "normal",
    "highlightColor": "blue",
    "highlightFontSize": 8,
    "highlightFontWeight": "bold",
    "mouseCursor": "pointer",
    "opacity": 1,
    "renderLabel": false,
    "semanticStrokeWidth": false,
    "strokeWidth": 1,
    "markerHeight": 6,
    "markerWidth": 6,
    "strokeDasharray": 1,
    "strokeDashoffset": 0,
    "strokeLinecap": "butt"
  }
};

const GraphComp = () => {
  const [circleSize, setCircleSize] = useState({ width: 0, height: 0 });
  const graphRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        setCircleSize({
          width: entry.contentRect.width + 20, // +20 for padding
          height: entry.contentRect.height + 20 // +20 for padding
        });
      }
    });

    if (graphRef.current) {
      resizeObserver.observe(graphRef.current);
    }

    return () => {
      if (graphRef.current) {
        resizeObserver.unobserve(graphRef.current);
      }
    };
  }, []);

  return (
      <div ref={graphRef}>
        <Graph
          id="graph-id" 
          data={data}
          config={myConfig}
        />
      </div>
  );
};

export default GraphComp;
