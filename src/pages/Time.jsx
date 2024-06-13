import React, { useState } from 'react';

function Time() {
    let time = new Date().toLocaleTimeString();
    const [ctime, setTime] = useState(time);

    const update = () => {
        let time = new Date().toLocaleTimeString();
        setTime(time);
    };
    setInterval(update, 1000);
    return (
        <>
            <div>{ctime}</div>
        </>
    );
}

export default Time;
