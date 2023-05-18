import React, { useMemo, useEffect, useRef, useState, useCallback, useReducer } from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from "./Lifecycle";
//import OptimizeTest from "./OptimizeTest";
import OptimizeTest from "./OptimizeTest2";

// const dummyList = [
//   {
//     id: 1,
//     author: "심승혁",
//     content: "하이 1",
//     emotion: 5,
//     created_date: new Date().getTime() // 
//   },
//   {
//     id: 2,
//     author: "홍길동",
//     content: "하이 2",
//     emotion: 4,
//     created_date: new Date().getTime()
//   },
//   {
//     id: 3,
//     author: "아무개",
//     content: "하이 3",
//     emotion: 1,
//     created_date: new Date().getTime()
//   },
// ]

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((it) =>
        it.id === action.targetId ?
          { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
}


function App() {

  //const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, [])

  //console.log(`data ${JSON.stringify(data)}`)
  const dataId = useRef(0)
  
  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => {console.log("res1",res); return res.json()})
    console.log(`res2 ${res}`);
    console.log(`res3 ${JSON.stringify(res)}`);
    // API로 받아온 JSON 데이터(res)를 새로운 객체로 만든다(initData)
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      };
    });
    //console.log(`initData ${JSON.stringify(initData)}`);
    dispatch({ type: "INIT", data: initData })
    return initData
    //setData(initData);
  };

  // useEffect 2번째 인자로 빈배열이 들어가면 component 가 mount 되자마자 콜백함수 getData() 수행
  useEffect(() => {
    console.log("App 컴포넌트 최초로드1")
    getData().then((result) => {console.log("result",result)});
    console.log("App 컴포넌트 최초로드2")
    return () => {
      console.log("App 컴포넌트 언마운트!")
    }
  }, [])
  useEffect(() => {
    console.log("App Component Update")
  })

  const onCreate = useCallback(
    (author, content, emotion) => {

      dispatch({ type: 'CREATE', data: { author, content, emotion, id: dataId.current } })

      // const created_date = new Date().getTime();
      // const newItem = {
      //   author,
      //   content,
      //   emotion,
      //   created_date,
      //   id: dataId.current
      // }
      dataId.current += 1;
      console.log("onCreate dataId.current",dataId.current)
      //setData((data) => [newItem, ...data])
    }, []);

  const onRemove = useCallback((targetId) => {
    //console.log(`${targetId}가 삭제되었습니다.`)

    dispatch({ type: "REMOVE", targetId })
    //const newDiaryList = data.filter((it) => it.id !== targetId);
    //console.log(newDiaryList);
    //setData(newDiaryList);
  },[]);

  const onEdit = useCallback((targetId, newContent) => {

    dispatch({ type: "EDIT", targetId, newContent })
    // setData(
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // )
  },[])

  // getDiaryAnalysis is not a function
  // 일기 리스트 데이터를 수정하는 것은 데이터의 길이에 영향을 미치지 않으므로 App 컴포넌트가 다시렌더링이 되더라도 수행되지 않는다
  const getDiaryAnalysis = useMemo(
    () => {
      console.log("일기 분석 시작")
      // 배열의 원소중에 emotion이 3이상인 것만 새로운 배열로 만든다 -> 그 갯수를 알기 위해 .length
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;

      return { goodCount, badCount, goodRatio };
    }, [data.length]
  );

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  
  React.useEffect(() => {
    console.log("data changed",data)
  }, [data])

  return (
    <div className="App">
      <OptimizeTest />
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}%</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
