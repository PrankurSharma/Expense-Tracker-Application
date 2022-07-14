import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";
import { baseUrl } from "../baseUrl";


const ChartsIncome = ({ smallLoad }) => {
  const [chartData, setChartData] = useState({});

  var palette = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];

  const chart = () => {
    let getAmount = [];
    let getTask = [];

    Axios.get(baseUrl + "/api/getincome")
      .then(res => {
        for (const dataObj of res.data) {
          getAmount.push(parseInt(dataObj.Amount));
          getTask.push(dataObj.Task);
        }
        setChartData({
          labels: getTask,
          datasets: [
            {
              label: "Amount",
              data: getAmount,
              backgroundColor: function (context) {
                return palette[context.dataIndex % palette.length];
              },
              borderWidth: 0
            }
          ]
        });
      })
      .catch(err => {
        alert(err);
      });
  };

  useEffect(() => {
    chart();
  }, [smallLoad]);
  return (
    <div className="App">
      <div style={{ width: '100%', height: '100%' }}>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              y: {
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              },
              x: {
                gridLines: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};
export default ChartsIncome;