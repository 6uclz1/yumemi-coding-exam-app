import React, { useState, useCallback, useEffect } from "react";
import { getPrefectures } from "../util/API";
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
        const selectPref: Array<PrefType> = selectPrefList.filter(
          (selectPref: PrefType) => selectPref.prefName !== e.target.value
        );
        setCheckedValues(selectPref.map((v) => v.prefName));
        setSelectPrefList(selectPref);
      } else {
        setCheckedValues([...checkedValues, e.target.value]);
        const pref: PrefType = prefList.filter(
          (prefList) => prefList.prefName === e.target.value
        )[0];
        setSelectPrefList([
          ...selectPrefList,
          { prefCode: pref.prefCode, prefName: pref.prefName },
        ]);
      }
    },
    [checkedValues, prefList]
  );

  const fetchData = async () => {
    const results: any = await getPrefectures();
    const prefectures: PrefType[] = results.result;
    setPrefList(prefectures);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="PrefCheckbox">
        <div className="PrefCheckbox-container">
          <div className="PrefCheckboxInfo-container">
            表示したい都道府県を選択してください。
          </div>
          {prefList.length !== 0 &&
            prefList.map((prefList) => (
              <div key={prefList.prefName} className={"Checkbox-container"}>
                <input
                  type="checkbox"
                  id={prefList.prefName}
                  value={prefList.prefName}
                  onChange={handleChange}
                  checked={checkedValues.includes(prefList.prefName)}
                />
                <label
                  htmlFor={prefList.prefName}
                  className="CheckboxLabel"
                  key={prefList.prefCode}
                >
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
