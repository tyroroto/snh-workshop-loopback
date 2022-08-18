import { useState } from "react";
import BMI from "./Bmi";
import Label from "./Label";
import NameInput from "./NameInput";

const BmiBox = () => {
    const [latestVal, setLatestVal] = useState('no val');
    return <div>
        <BMI></BMI>
        {/* <Label fz={14} text={'SAKON'} number={3}></Label> */}
        {/* <h1>Latest Value = {latestVal}</h1> */}
        {/* <NameInput onSaved={setLatestVal}/> */}
        {/* <Label fz={14} text={'HOSITAL'}></Label>
        <Label fz={24} text={'OKOK'}></Label>
        <Label  number={2}></Label>
        <Label  number={1}></Label>
        <Label></Label> */}

    </div>
}

export default BmiBox;