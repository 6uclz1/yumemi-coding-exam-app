import React, { useState, useLayoutEffect, useCallback } from "react";
import PrefCharts from "./PrefCharts";
import "./PrefCheckbox.css";

const PrefCheckbox = () => {
  type PrefType = {
    prefCode: number;
    prefName: string;
  };
  const [prefList, setPrefList] = useState<Array<PrefType>>([]);
  const [selectPrefList, setSelectPrefList] = useState<Array<PrefType>>([]);

  const [checkedValues, setCheckedValues] = useState<Array<String>>([]);

  const handleChange = useCallback(
    (e: any) => {
      if (checkedValues.includes(e.target.value)) {
        setCheckedValues(
          checkedValues.filter(
            (checkedValue: String) => checkedValue !== e.target.value
          )
        );
      } else {
        setCheckedValues([...checkedValues, e.target.value]);
      }
    },
    [checkedValues]
  );

  useLayoutEffect(() => {
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "FXpRNLpjvvMd3rOz9dZsANvhY5ScNLa9P4H86OLb",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrefList(data.result);
      });
  }, []);

  useLayoutEffect(() => {
    setSelectPrefList(
      prefList.filter((prefList) => checkedValues.includes(prefList.prefName))
    );
  }, [checkedValues, prefList]);

  return (
    <>
      <div className="PrefCheckbox">
        <div className="PrefCheckbox-container">
          {prefList.length !== 0 &&
            prefList.map((prefList) => (
              <div className="Checkbox" key={prefList.prefName}>
                <label key={prefList.prefName}>
                  <input
                    key={prefList.prefName}
                    type="checkbox"
                    value={prefList.prefName}
                    onChange={handleChange}
                    checked={checkedValues.includes(prefList.prefName)}
                  />
                  {prefList.prefName}
                </label>
              </div>
            ))}
        </div>
      </div>
      <PrefCharts prefList={selectPrefList} />
    </>
  );
};

export default PrefCheckbox;
