import React from 'react';
import {useDispatch, useSelector} from "react-redux";

function App() {

    const store = useSelector(store => store);
    const dispatch = useDispatch();

    return (
        <div>
            Redux saga
            <button onClick={() => dispatch({type: 'LOAD_DATA'})}> CLICK ME</button>
        </div>
    );
}

export default App;
