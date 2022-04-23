// npm library
import React, { useState, useCallback, useMemo } from "react";

// module
import { fetchPrefData } from "../module/fetchPrefData";

// components
import PrefCharts from "./PrefCharts";

// style
import "./PrefCheckbox.css";

type PrefType = {
  prefCode: number;
  prefName: string;
};

const PrefCheckbox = () => {
  const [prefList, setPrefList] = useState<Array<PrefType>>([]);
  const [selectPrefList, setSelectPrefList] = useState<Array<PrefType>>([]);
  const [checkedValues, setCheckedValues] = useState<Array<String>>([]);

  const handleChange = useCallback(
    (e: any) => {
      // 選択済みのチェックボックスを選択した場合
      if (checkedValues.includes(e.target.value)) {
        const selectPref: Array<PrefType> = selectPrefList.filter(
          (selectPref: PrefType) => selectPref.prefName !== e.target.value
        );
        setCheckedValues(selectPref.map((v) => v.prefName));
        setSelectPrefList(selectPref);
      } else {
        // 選択していないチェックボックスを選択した場合
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

  useMemo(() => {
    fetchPrefData(setPrefList);
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
