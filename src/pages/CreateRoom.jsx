import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

function CreateRoom() {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!name.trim()) {
            isValid = false;
            newErrors.name = "Name is mandatory";
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        
        if (validate()) {
           
            try {
                const response = await axios.post(
                    `${serverEndpoint}/room`,
                    { createdBy: name },
                    { withCredentials: true }
                );

                const roomCode = response.data.roomCode;
               
                navigate(`/room/${roomCode}`);
            } catch (error) {
                console.log(error);
                setErrors({ message: "Error creating room, please try again" });
            }
        }
    };

    return (
        <div className="container text-center py-5">
            <h2 className="mb-4">Create Room</h2>

            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="mb-3">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={errors.name ? "form-control is-invalid" : "form-control"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="invalid-feedback">{errors.name}</div>
                    </div>

                    {errors.message && (
                        <div className="alert alert-danger">{errors.message}</div>
                    )}

                    <div className="mb-3">
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateRoom;
