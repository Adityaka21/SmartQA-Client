import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

function Question({ roomCode }) {
    const [question, setQuestion] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (question.trim().length === 0) {
            isValid = false;
            newErrors.question = "Question is mandatory";
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const participantName = localStorage.getItem("participant-name") || "Anonymous";
                const response = await axios.post(
                    `${serverEndpoint}/room/${roomCode}/question`,
                    {
                        content: question,
                        user: participantName
                    },
                    {
                        withCredentials: true
                    }
                );
                console.log("Question submitted:", response.data);
                setQuestion("");
                setErrors({});
            } catch (error) {
                console.error("Error posting question:", error);
                setErrors({ message: "Error posting question, please try again" });
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h5 className="mb-3">Ask a Question</h5>
                    <div className="mb-3">
                        <textarea
                            id="question"
                            name="question"
                            className={errors.question ? "form-control is-invalid" : "form-control"}
                            rows="3"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Enter your question here"
                        />
                        <div className="invalid-feedback">{errors.question}</div>
                        {errors.message && (
                            <div className="text-danger mt-2">{errors.message}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-primary w-100"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
