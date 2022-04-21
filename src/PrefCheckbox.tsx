import React, {useState, useLayoutEffect, useCallback} from 'react'
import PrefCharts from './PrefCharts';
import "./PrefCheckbox.css";

const PrefCheckbox = () => {

    const [prefList, setPrefList] = useState<any>([]);
    const [selectPrefList, setSelectPrefList] = useState<any>([]);

    const [checkedValues, setCheckedValues] = useState<any>([]);

    const handleChange = useCallback((e:any) => {
        if (checkedValues.includes(e.target.value)) {
            const a = checkedValues.filter((checkedValue:any) => checkedValue !== e.target.value)
            setCheckedValues(a);
          } else {
            const a = [...checkedValues, e.target.value]
            setCheckedValues(a);
          }
    }, [checkedValues]);

    useLayoutEffect(() => {
        fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'FXpRNLpjvvMd3rOz9dZsANvhY5ScNLa9P4H86OLb'
              },
          })
        .then(res => res.json())
        .then(data => {
            setPrefList(data.result)
        })
    },[])

    useLayoutEffect(() => {
        setSelectPrefList(prefList.filter( (prefList: {prefCode: any; prefName: any} ) => checkedValues.includes(prefList.prefName)));
    },[checkedValues, prefList])

    return (
        <>
        <div className='PrefCheckbox'>
            {/* <p>
                現在選択されている値：<b>{checkedValues.join(", ")}</b>
            </p> */}
            <div className='PrefCheckbox-container'>
                {prefList.length !== 0 &&
                    prefList.map((prefList: {
                        prefCode: any; prefName: any
                    }) =>
                        <div className='Checkbox'>
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

                    )
                }
            </div>
        </div>
        <PrefCharts
            prefList={selectPrefList}
        />
        </>
      )
}


export default PrefCheckbox;