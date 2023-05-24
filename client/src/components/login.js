import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from "axios"
import { useNavigate } from "react-router-dom";

function Login() {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const[status,setStatus]=useState("")
    const navigate = useNavigate()

    const validateUser = async () => {
        let data = await Axios.post("http://localhost:7000/login", { email, password })
        if(data.data===200){
            navigate('/')
        }else if(data.data===404){
            setStatus("User does not exist")
        }else{
            setStatus("Incorrect email or password")
        }
    }

    return (
        <div className="row">
            <div className="col-md-3"></div>
            <Form className="col-md-6 mt-5" onSubmit={(event) => event.preventDefault()}>
                <h3 className="text-center mb-5">Login</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="E-mail" onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
                <Button onClick={validateUser} variant="success" type="submit" className="w-100">
                    Login
                </Button>
                <div className="mt-3 text-center">
                    <p className="text-danger">{status}</p>
                    <a href="/signup">Don't have an account? Sign up</a>
                </div>
            </Form>
        </div>
    );
}

export default Login