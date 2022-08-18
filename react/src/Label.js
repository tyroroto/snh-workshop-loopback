import { useState } from "react";

const Label = ({ text, number, fz = 22 }) => {
    const defaultValue = 'NAME:'
    const [name, setName] = useState('Kawin')

    return <h1 style={{ fontSize: fz, color: 'red' }}>
        {defaultValue} {text} {number}
        {/* <h2>
            {name}
        </h2> */}
    </h1>
}

export default Label;