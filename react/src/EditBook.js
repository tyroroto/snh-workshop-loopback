import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const apiUrl = 'http://localhost:3000';
const EditBook = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (params.id != null) {
            setId(params.id);
            axios.get(apiUrl + '/bookings/' + params.id).then(response => {
                setCode(response.data.code);
                setName(response.data.name);
                setPrice(response.data.price);
            }).catch(e => {
                console.error('get api error', e);
            })
        }
    }, [])

    const onUpdate = () => {
        axios.patch(apiUrl + '/bookings/' + id, {
            code,
            name,
            price
        }).then(response => {
            console.log(response)
            navigate('/list-book');
        }).catch(e => {
            console.error('patch error', e)
        })
    }

    const onCreate = () => {
        axios.post(apiUrl + '/bookings', {
            code,
            name,
            price
        }).then(response => {
            console.log(response)
            navigate('/list-book');
        }).catch(e => {
            console.error('post error', e)
        })
    }
    return <Container maxWidth='sm'>
        {
            params.id != null ?
            <h1>กำลังแก้ไขข้อมูลของ</h1>
            :<h1>กำลังสร้างข้อมูล</h1>
        }
        
        <h2>ID: {id}</h2>
        <Box>
            <TextField label='code' value={code}
                onChange={e => {
                    setCode(e.target.value)
                }}
            />
        </Box>
        <Box mt={1}>
            <TextField label='name' value={name}
                onChange={e => {
                    setName(e.target.value)
                }}
            />
        </Box>
        <Box mt={1}>
            <TextField label='price' value={price}
                onChange={e => {
                    setPrice(parseInt(e.target.value))
                }}
            />
        </Box>
        <Box mt={1}>
            <Button variant="contained" onClick={() => {
                if (params.id == null) {
                    onCreate();
                } else {
                    onUpdate();
                }
            }}> Save </Button>
        </Box>
    </Container>
}

export default EditBook;