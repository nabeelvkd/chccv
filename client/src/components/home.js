import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    const validate = async () => {
        let user = await axios.get("http://localhost:7000")
        console.log(user);
        if (user.data === 400) {
            navigate('/login')
        }
    }
    validate()

    return (
        <div>
            <h1>Home Page2</h1>
        </div>
    )
}
export default Home