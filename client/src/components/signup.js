import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Signup() {

    const d = new Date();

    const [adn, setAdn] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [semester, setSemester] = useState(0)
    const [branch, setBranch] = useState("")
    const [college, setCollege] = useState("")
    const [name, setName] = useState("")
    const [university, setUniversity] = useState("KTU")
    const navigate = useNavigate()

    axios.defaults.withCredentials=true;

    const getCollgeData = (admission) => {
        console.log("hi");
        let year = admission.slice(3, 5)
        let clg = admission.slice(0, 3)
        let course = admission.slice(5, 7)
        switch (clg) {
            case "MAC":
                setCollege("Mar Athanasius College of Engineering Kothamangalam");
                break;
            case "CET":
                setCollege("College of Engineering Trivandrum");
                break;
            case "KKE":
                setCollege("Govt. Engineering College, Kozhikkode")
                break;
            case "KNR":
                setCollege("Govt. College of Engineering, Kannur")
                break;
            case "KTE":
                setCollege("Govt. Rajiv Gandhi Institute of Tech., Kottayam")
                break;
            case "NSS":
                setCollege("N S S College of Engineering, Palakkad")
                break;
            case "PKD":
                setCollege(" Govt. Engineering College, Sreekrishnapuram")
                break;
            case "TCR":
                setCollege("Govt. Engineering College,Thrissur")
                break;
            case "TKM":
                setCollege("T K M College of Engineering, Kollam")
                break;
            case "TRV":
                setCollege("Govt. Engineering College, Barton Hills, TVM")
                break;
        }
        switch (course) {
            case "CE":
                setBranch("Civil Engineering");
                break;
            case "ME":
                setBranch("Mechanical Engineering");
                break;
            case "EE":
                setBranch("Electrical and Electronics Engineering")
                break;
            case "EC":
                setBranch("Electronics and Communication Engineering");
                break;
            case "CS":
                setBranch("Computer Science and Engineering");
                break;
        }
        year = -parseInt(year) + d.getFullYear() - 2000
        if (d.getMonth > 6) {
            setSemester(year * 2 + 1)
        } else {
            setSemester(year * 2)
        }
    }
    const autofill = (event) => {
        setAdn(event.target.value.toUpperCase())
        if (adn.length === 9) {
            getCollgeData(adn)
        }
    }
    const createUser = async () => {
        let status=await axios.post("http://localhost:7000/signup", { email, password, college, adn, branch, name, semester })
        console.log(status.data)
        if(status.data===200){
            navigate('/')
        }else{
            navigate('/login')
        }
    }
    return (
        <div className="row">
            <div className="col-md-4 col-sm-2"></div>
            <Form className="col-md-4 bg mt-5 mb-5 col-sm-8" onSubmit={(event) => event.preventDefault()}>
                <h2 className="text-center mt-5">Engr<span>.com</span></h2>
                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                    <Form.Control type="name" placeholder="Name" onChange={(event) => { setName(event.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select >
                        <option value="KTU">APJ Abdul Kalam Technological University (KTU)</option>
                        <option value="UTU">Uttarakhand Technical University</option>
                        <option value="NITC">NIT Calicut (NITC)</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="name" placeholder="University Admission Number" value={adn} onChange={autofill} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>College</Form.Label>
                    <Form.Control type="name" value={college} placeholder="College" onChange={(event) => setCollege(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 row">
                    <div className="col-md-8">
                        <Form.Label>Branch</Form.Label>
                        <Form.Control type="name" placeholder="Branch" value={branch} onChange={(event) => { setBranch(event.target.value) }} />
                    </div>
                    <div className="col-md-4">
                        <Form.Label>Semester</Form.Label>
                        <Form.Control type="number" value={semester} placeholder="Semester" onChange={(event) => { setSemester(event.target.value) }} />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                </Form.Group>
                <Button className="mb-3 w-100" onClick={createUser} variant="primary" type="submit">
                    Submit
                </Button>
                <Form.Group className="mb-5 text-center">
                    <a href="/login" className="underline-none">Already have an account. Sign in ?</a>
                </Form.Group>

            </Form>
        </div>
    );
}

export default Signup