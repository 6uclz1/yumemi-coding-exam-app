import React, {useState, useLayoutEffect } from 'react'
import "./PrefCharts.css";

import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ComposedChart
  } from "recharts";

const fetchCatFactsData = async (setGraphData:any, props:any) => {
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

    const data: any = prefData;
    let gDataList: any = [];
    // let yearList: any = [];
    const yearList: number[] = [1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045];

    // for (const [, value] of Object.entries(data)) {
    //     // console.log(key);
    //     // console.log(value);
    //     const v:any = value;
    //     yearList = v.map((v: { year: any; }) => v.year);
    // }

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
}

const PrefCharts = (props:any) => {

    const [graphData, setGraphData] = useState<any>([]);

    useLayoutEffect(() => {
        fetchCatFactsData(setGraphData, props)
    }, [props])

    return (
        <div className='PrefCharts'>
            <div className='PrefCharts-container'>
            <ResponsiveContainer width={'100%'} height={480}>
                <ComposedChart
                    data={graphData}
                    margin={{ top: 30, bottom: 10, right: 10, left: 10 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="year"
                    tick={{fontSize: 10}}
                />
                <YAxis
                    tick={{fontSize: 10}}
                />
                <Tooltip />
                <Legend />
                {Object.entries(props.prefList).map(([key, value]: any) => {
                    return (
                        <Line
                            type="linear"
                            key={key}
                            dataKey={value.prefName}
                            strokeWidth={3}
                            stroke={'#'+Math.floor(Math.random()*16777215).toString(16)}
                            activeDot={{ r: 8 }}
                            isAnimationActive={false}
                        />
                    );
                })
                }
                </ComposedChart>
            </ResponsiveContainer>
            </div>

        </div>


    )
}

export default PrefCharts;