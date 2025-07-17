import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="mb-4">SmartQA - Get Started!</h2>

          <p className="mb-2">
            Click Create Room if you are the host. Share the code with participants.
          </p>

          <p className="mb-4">
            If you are a participant, click Join Room and ask for the room code from the host.
          </p>

          <div className="d-flex justify-content-center">
            <Link to="/create" className="btn btn-primary mx-3">
              Create Room
            </Link>
            <Link to="/join" className="btn btn-success mx-3">
              Join Room
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
