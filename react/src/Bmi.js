import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const BMI = () => {
    const [weight, setWeight] = useState(50);
    const [height, setHeight] = useState(170);
    const [bmi, setBMI] = useState(0);
    const [textBmi, setTextBmi] = useState('');
    // w / h * h
    useEffect(() => {
        // cal bmi her
        console.log(weight, height);
        let weightInt = parseInt(weight);
        let heightInt = parseInt(height);
        let heightM = heightInt / 100;
        let tempBMI = weightInt / (heightM * heightM);
        calBmiText(tempBMI)
        setBMI(tempBMI);
    }, [weight, height])

    const calBmiText = (tempBMI) => {
        if (tempBMI > 30) {
            setTextBmi('อ้วนมาก')
        } else if (tempBMI > 25 && tempBMI < 29.9) {
            setTextBmi('อ้วน')
        } else if (tempBMI > 18.6 && tempBMI < 24) {
            setTextBmi('น้ำหนักปกติ เหมาะสม')
        } else if (tempBMI < 18.5) {
            setTextBmi('ผอมเกินไป')
        }
    }

    return <>
        <h1> current  BMI: {bmi} : {textBmi}</h1>
        <div>
            <TextField label="Weight" variant="outlined" value={weight} onChange={e => {
                setWeight(e.target.value)
            }} />
        </div>

        <div>
            <TextField label="Height" variant="outlined" value={height} onChange={e => {
                setHeight(e.target.value)
            }} />
        </div>
        <div>
            <Button variant="contained" style={{marginRight:4}} >คำนวน</Button>
            <Box component={'span'} ml={2}>
                <Button variant="contained" color="error">ยกเลิก</Button>
            </Box>
        </div>
    </>
}
export default BMI;