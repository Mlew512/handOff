import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <header className="text-center">
        <h1>HandOff</h1>
      </header>
      <section className="mt-4">
        <p>
          Nurse centric and designed Hand-off app curated to streamline and improve
          the patient hand-off process. The primary goal of this app is to pull
          relevant patient information and present it in an easy-to-read and
          organized format for a smooth transition between nursing shifts.
        </p>
      </section>
      <section className="mt-4">
        <h2>Key Features:</h2>
        <ul>
          <li>User Authentication</li>
          <li>Patient Information Database</li>
          <li>Real-time Sync</li>
          <li>Ai Generated Summaries of multiple assessments</li>
        </ul>
      </section>
      <section className="mt-4">
        <h2>Benefits:</h2>
        <ul>
          <li>Efficiency: Streamlines the hand-off process, saving time for patient care</li>
          <li>Accuracy: Minimizes the risk of errors</li>
          <li>Communication: Enhances communication between shifts</li>
        </ul>
      </section>
      <section className="mt-4">
        <h2>HandOff App Mission:</h2>
        <p>
          HandOff aims to enhance patient care by ensuring a
          smooth transition of information between nursing shifts, ultimately
          improving the overall efficiency and effectiveness of healthcare
          delivery.
        </p>
      </section>
      <section className="mt-4">
        <h2>Additional notes for next release:</h2>
        <ul>
          <li>Expanding data interpretation to include labs, medications, and intake and output data</li>
          <li>An improved assessment documentation interface</li>
          <li>More advanced and detailed Ai responses with the latest Ai models. </li>
          <li>Role based access</li>
        </ul>
      </section>
    </div> 
  );
};

export default Home;
