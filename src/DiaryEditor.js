import React, { useContext, useEffect, useRef, useState } from "react";

import {DiaryDispatchContext} from "./App.js"

const DiaryEditor = () => {
    //useEffect: 뒤에 배열인자가 없으면 렌더링 될대마다 실행
    useEffect(() => {
        console.log("DiaryEditor 랜더")
    })

    const {onCreate} = useContext(DiaryDispatchContext)

    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: "심승혁",
        content: "오늘의 일기",
        emotion: 1,
    });

    React.useEffect(() => {
        console.log("DiaryEditor state changed", state)
    }, [state])

    const handleChangeState = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (state.author.length < 1) {
            //alert("작성자는 최소 1글자 이상 입력해주세요");
            authorInput.current.focus();
            //focus
            return;
        }
        if (state.content.length < 5) {
            //alert("일기 본문은 최소 5글자 이상 입력해주세요");
            contentInput.current.focus();
            //focus
            return;
        }

        onCreate(state.author, state.content, state.emotion);
        console.log(state);
        alert("저장 성공?!?!?");
        setState({
            author: "",
            content: "",
            emotion: 1,
        });
    };

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    ref={authorInput}
                    name="author"
                    value={state.author}
                    onChange={handleChangeState}
                />
            </div>
            <div>
                <textarea
                    ref={contentInput}
                    name="content"
                    value={state.content}
                    onChange={handleChangeState}
                />
            </div>
            <div>
                <span>오늘의 감정점수 : </span>
                <select
                    name='emotion'
                    value={state.emotion}
                    onChange={handleChangeState}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={500}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    );
};
export default React.memo(DiaryEditor);