import React, {useState, useLayoutEffect } from 'react'

// import PrefPopulationChartLine from "./PrefPopulationChartLine";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

const fetchCatFactsData = async (setData:any, props:any) => {
    let prefData: any = {};
    for (const pref of props.prefList) {
        const res = await fetch('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' + pref.prefCode, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'FXpRNLpjvvMd3rOz9dZsANvhY5ScNLa9P4H86OLb'
            },
        });
        const data = await res.json()
        prefData[pref.prefName] = data.result.data[0].data;
    }
    setData(prefData)
}

const PrefCharts = (props:any) => {

    const [data, setData] = useState<any>([]);
    const [graphData, setGraphData] = useState<any>([]);

    useLayoutEffect(() => {
        fetchCatFactsData(setData, props)
      }, [props])

    useLayoutEffect(() => {

        // setData(a);
        let gDataList:any = [];

        const yearList: any = [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045];

        for (const year of yearList) {
            let populationObject:any = {year: year}
            for (const [key, value] of Object.entries(data)) {
                const k:any = key
                const v:any = value;
                let vv:any = v.filter((v: { year: any; }) => v.year === year);
                populationObject = {...populationObject, [k]: vv[0].value}
            }
            gDataList.push(populationObject);
        }

        setGraphData(gDataList);

    },[props,data])

    return (
        <div>
            <LineChart
              width={1200}
              height={800}
              data={graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.entries(props.prefList).map(([key, value]: any) => {
                return (
                    <Line
                        type="linear"
                        key={key}
                        dataKey={value.prefName}
                        stroke={'#'+Math.floor(Math.random()*16777215).toString(16)}
                        activeDot={{ r: 8 }}
                    />
                );
            })
            }
            </LineChart>
        </div>
    )
}

export default PrefCharts;