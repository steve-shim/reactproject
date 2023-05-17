import React, { useState, useEffect } from "react";

const Textview = React.memo((a) => {
    console.log(`a ${JSON.stringify(a)}`)
    useEffect(() => {
        console.log(`Update :: Text : ${a.text}`)
    })
    return <div>{a.text}</div>;
});

const Countview = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`Update :: Count : ${count}`)
    })
    return <div>{count}</div>
});

//부모 컴포넌트 OptimizeTest의 state가 바껴서 
//자식 컴포넌트 Countview, Textview가 모두 리랜더링 된다 (비효율)
const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [text, setText] = useState("");

    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>count</h2>
                <Countview count={count} />
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
            <div>
                <h2>text</h2>
                <Textview text={text}></Textview>
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </div>

        </div>)
};

export default OptimizeTest;