import { RoomSharp } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table";
import InfoBox from "./InfoBox";
import { Card, CardContent } from "@material-ui/core";
import DonutChart from "./DonutChart";
import LineChart from "./LineChart";
import Map from "./Map";

function App() {
  const [stateInfo, setStateInfo] = useState([]);
  const [updateState, setUpdateState] = useState({});

  useEffect(() => {
    const getStateData = async () => {
      await fetch("https://api.covid19india.org/data.json")
        .then((response) => response.json())
        .then((data) => {
          setStateInfo(data.statewise);
        });
    };

    getStateData();
  }, []);

  const getMapData = stateInfo.map((states) => ({
    id: states.statecode,
    state: states.state,
    value: states.confirmed,
    lastupdatedtime: states.lastupdatedtime,
  }));

  const updateBoxes = (index) => {
    setUpdateState(stateInfo[index]);
  };

  const updateDonut = (index) => {
    setUpdateState(stateInfo[index]);
  };

  const updatedBoxByMap = (id) => {
    const record = stateInfo.filter((stateData) => {
      return stateData.statecode === id;
    });
    setUpdateState(record[0]);
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_left_header">
          <div className="app_left_header_icon">
            <RoomSharp className="app_left_roomsharp" />
          </div>
          <div className="app_left_header_text">
            <h1>INDIA COVID-19 Tracker</h1>
            <p>
              Let's all pray to make our Earth Covid-19 free soon, Stay safe and
              do the Locate.
            </p>
          </div>
        </div>
        <Card className="card_chart">
          <CardContent className="card_chartcontent">
            <div className="donut_chart">
              <DonutChart
                confirmed={updateState.confirmed}
                active={updateState.active}
                recovered={updateState.recovered}
                deaths={updateState.deaths}
              />
            </div>

            <div className="line_chart">
              <LineChart />
            </div>
          </CardContent>
        </Card>

        <Card className="divstats">
          <CardContent>
            <Table states={stateInfo} onSelect={updateBoxes} />
          </CardContent>
        </Card>
      </div>
      <div className="app_right">
        <div className="app_right_header">
          <h1>INDIA MAP</h1>
          <p>HOVER OVER A STATE FOR MORE DETAILS</p>
        </div>

        <div className="app_right_info_maps">
          <Card>
            <CardContent>
              <div className="app_right_stats">
                <InfoBox
                  cn="app_right_confirmed"
                  title="CONFIRMED"
                  cases={updateState.confirmed}
                  // casesbyMap={updateStateByMap.confirmed}
                />
                <InfoBox
                  cn="app_right_active"
                  title="ACTIVE"
                  cases={updateState.active}
                  // casesbyMap={updateStateByMap.active}
                />
                <InfoBox
                  cn="app_right_recovered"
                  title="RECOVERED"
                  cases={updateState.recovered}
                  // casesbyMap={updateStateByMap.recovered}
                />
                <InfoBox
                  cn="app_right_deceased"
                  title="DECEASED"
                  cases={updateState.deaths}
                  // casesbyMap={updateStateByMap.deaths}
                />
              </div>
              <div className="app_right_map">
                <Map getMapData={getMapData} onSelect={updatedBoxByMap} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
