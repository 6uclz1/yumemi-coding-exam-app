import React, {useState, useLayoutEffect, useCallback} from 'react'
import PrefCharts from './PrefCharts';

// const fetchCatFactsData = async (setData:any, props:any) => {
//     let prefData: any = {};
//     for (const pref of props.prefList) {
//         const res = await fetch('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' + pref.prefCode, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-API-KEY': 'FXpRNLpjvvMd3rOz9dZsANvhY5ScNLa9P4H86OLb'
//             },
//         });
//         const data = await res.json()
//         prefData[pref.prefName] = data.result.data[0].data;
//     }
//     setData(prefData)
// }

const PrefCheckbox = () => {

    const [prefList, setPrefList] = useState<any>([]);
    const [selectPrefList, setSelectPrefList] = useState<any>([]);

    const [checkedValues, setCheckedValues] = useState<any>([]);

    // const [data, setData] = useState<any>([]);
    // const [graphData, setGraphData] = useState<any>([]);

    // useLayoutEffect(() => {
    //     fetchCatFactsData(setData, props)
    //   }, [props])

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

    useLayoutEffect(() => {
        setSelectPrefList(selectPrefList);
    },[selectPrefList])

    return (
        <>
            <p>
                現在選択されている値：<b>{checkedValues.join(", ")}</b>
            </p>
            {prefList.length !== 0 &&
                prefList.map((prefList: {
                    prefCode: any; prefName: any
                }) =>
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
                )
            }
            <PrefCharts
                prefList={selectPrefList}
            />
        </>
      )
}


export default PrefCheckbox;