import { Title } from "@yegna-systems/ui/typography";
import React, { PureComponent } from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

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

export default class CustomerSatisfaction extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/stacked-area-chart-forked-5yjhcs";

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Title as="h6">Customer Satisfaction</Title>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <Tooltip />
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="#0B465051"
              fill="#0B465051"
            />
            <Area
              type="monotone"
              dataKey="amt"
              stackId="1"
              stroke="#D7F40053"
              fill="#D7F40053"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
