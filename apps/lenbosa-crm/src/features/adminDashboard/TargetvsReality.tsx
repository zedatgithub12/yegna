import { Title } from "@yegna-systems/ui/typography";
import React, { PureComponent } from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class TargetVsReality extends PureComponent {
  static demoUrl = "https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g";

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Title as="h6">Target Vs Reality</Title>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="uv" fill="#0B4650" />
            <Bar dataKey="pv" fill="#D7F400" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
