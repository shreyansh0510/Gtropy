import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";
import "./Map.css";

const INDIA_TOPO_JSON = require("./india.topo.json");

const PROJECTION_CONFIG = {
  scale: 1000,
  center: [78.9629, 22.5937],
};

const colorRange = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const defaultColor = "#EEE";

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 10ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

function Map({ getMapData, onSelect }) {
  const [data, setData] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [stateName, setStateName] = useState("");
  const [time, setTime] = useState();

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.value))
    .range(colorRange);

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    setData(getMapData);

    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
      setStateName(`${geo.properties.name}`);
      onSelect(geo.id);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  // const getTime = () => {
  //   const getTimeStats = getMapData.filter((getMapDataTime) => {
  //     return getMapDataTime.id === "TT";
  //   });
  //   setTime(getTimeStats);
  //   console.log(getTimeStats);
  // };

  return (
    <div className="map">
      <div className="map_header">
        <h1 className="map_header_statename">{stateName}</h1>
        <div className="time">
          <p className="time_update">LAST UPDATED</p>
          <p>{time}21/02/2021 23:08:29</p>
        </div>
      </div>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        className="composableMap"
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={800}
        height={600}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              //console.log(geo.id);
              const current = data.find((s) => s.id === geo.id);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : defaultColor}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                  // onMouseOver={getTime}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default Map;
