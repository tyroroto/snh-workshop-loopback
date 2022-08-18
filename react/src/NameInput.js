import { useEffect, useState } from "react";
import Label from "./Label";
const NameInput = ({onSaved}) => {
    let cVal = '-';
    const [val, setVal] = useState('-')
    const [savedValue, setSavedValue] = useState([]);

    useEffect( () => {
        console.log('On Init Component')
    }, [])

    useEffect( () => {
        console.log('On Value change')
    }, [val])

    useEffect( () => {
        onSaved(val);
    }, [savedValue])
    return <>
        <label>Name Input</label>
        <input type={'text'} onChange={(e) => {
            console.log(e.target.value);
            // normal variable
            cVal = e.target.value;
            // state
            setVal(e.target.value);
        }}>
        </input>
        <button onClick={() => {
            let tempSavedValue = [...savedValue];
            tempSavedValue.push(val);
            setSavedValue(tempSavedValue);
        }}>Save Values</button>

        <button onClick={() => {
            // reset
            setSavedValue([]);
        }}>Reset</button>
        {
            savedValue.map((text, index) => {
                return <Label key={index} text={text}></Label>
            })
        }
    </>
}
export default NameInput;