import { useParams } from "react-router-dom";
import Question from "./Question";
import { useEffect, useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import socket from "../config/socket";
import axios from "axios";
import { useSelector } from "react-redux";

function Room() {
    const { code } = useParams();
    const user = useSelector((state) => state.user.userDetails);

    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState(null);
    const [errors, setErrors] = useState({});
    const [questions, setQuestions] = useState([]);

    const fetchRoom = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/room/${code}`, {
                withCredentials: true,
            });
            setRoom(response.data);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to fetch room details, please try again' });
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/room/${code}/question`, {
                withCredentials: true,
            });
            setQuestions(response.data);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to fetch questions, please try again' });
        }
    };

    const handleDelete = async (questionId) => {
        try {
            await axios.delete(`${serverEndpoint}/room/${code}/question/${questionId}`, {
                withCredentials: true,
            });
            setQuestions((prev) => prev.filter((q) => q._id !== questionId));
        } catch (error) {
            console.error("Failed to delete question:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchRoom();
            await fetchQuestions();
            setLoading(false);
        };

        fetchData();

        socket.emit("join-room", code);
        socket.on("new-question", (question) => {
            setQuestions((prev) => [question, ...prev]);
        });

        return () => {
            socket.off("new-question");
        };
    }, [code]);

    if (loading) {
        return (
            <div className="container text-center py-5">
                <p>Fetching Room Details......</p>
            </div>
        );
    }

    if (errors.message) {
        return (
            <div className="container text-center py-5">
                <p>{errors.message}</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* User greeting and avatar */}
            <div className="d-flex align-items-center mb-3">
                <img
                    src="https://www.gravatar.com/avatar/?d=mp"
                    alt="avatar"
                    width="40"
                    height="40"
                    className="rounded-circle me-2"
                />
                <span className="fw-bold">Welcome, {user?.name || "Guest"}</span>
            </div>

            {/* Room info */}
            <h2 className="mb-4">Room: {code} created by {room.createdBy}</h2>

            {/* Questions list */}
            <div className="row">
                <div className="col-auto">
                    <ul className="list-group">
                        {questions.map((question) => (
                            <li key={question._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {question.content}
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(question._id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Ask Question */}
            <Question roomCode={code} />
        </div>
    );
}

export default Room;
