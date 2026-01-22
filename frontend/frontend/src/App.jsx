import { useState } from "react";
import { ethers } from "ethers";
import abi from "./Healthcare.json";
import "./index.css";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
// ⚠️ Replace if you redeploy

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [records, setRecords] = useState([]);
  const [addressInput, setAddressInput] = useState("");
  const [appointments, setAppointments] = useState([]);

  /* ---------------- CONNECT WALLET ---------------- */
  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    const healthcare = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi.abi,
      signer
    );

    setAccount(addr);
    setContract(healthcare);
  }

  /* ---------------- PATIENT: ADD RECORD ---------------- */
  async function addRecord() {
    if (!ipfsHash) return alert("Enter IPFS hash");

    if (!contract) {
    alert("Contract not connected. Click Connect MetaMask first.");
    return;
  }

    const tx = await contract.addMedicalRecord(ipfsHash);
    await tx.wait();
    alert("Medical record added");
    setIpfsHash("");
  }

  /* ---------------- DOCTOR: REGISTER ---------------- */
  async function registerDoctor() {
    const tx = await contract.registerDoctor("DOC-LICENSE-001");
    await tx.wait();
    alert("Doctor registered (waiting for admin verification)");
  }

  /* ---------------- ADMIN: VERIFY DOCTOR ---------------- */
  async function verifyDoctor() {
    if (!addressInput) return alert("Enter doctor address");

    const tx = await contract.verifyDoctor(addressInput);
    await tx.wait();
    alert("Doctor verified");
  }

  /* ---------------- PATIENT: GRANT ACCESS ---------------- */
  async function grantAccess() {
    if (!addressInput) return alert("Enter doctor address");

    const tx = await contract.grantAccess(addressInput);
    await tx.wait();
    alert("Access granted to doctor");
  }

  /* ---------------- DOCTOR: VIEW RECORDS ---------------- */
  async function viewRecords() {
    try {
      const data = await contract.getMedicalRecords(addressInput);
      setRecords(data);
    } catch (err) {
      alert(err.reason || "Access denied");
      console.error(err);
    }
  }

  /* ---------------- APPOINTMENT (FRONTEND DEMO) ---------------- */
  function bookAppointment() {
    if (!addressInput) return;

    setAppointments([
      ...appointments,
      {
        patient: addressInput,
        doctor: account,
        date: new Date().toLocaleString(),
      },
    ]);
    alert("Appointment booked");
  }

  return (
    <div className="app">
      <div className="card wide">
        <h1>🏥 Blockchain Healthcare DApp</h1>

        {!account ? (
          <button className="btn primary" onClick={connectWallet}>
            🦊 Connect MetaMask
          </button>
        ) : (
          <p className="connected">Connected: {account}</p>
        )}

        <hr />

        {/* PATIENT SECTION */}
        <h2>🧑‍🦱 Patient Panel</h2>

        <input
          placeholder="Enter IPFS Hash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
        />
        <button className="btn success" onClick={addRecord}>
          Add Medical Record
        </button>

        <input
          placeholder="Doctor Address"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
        />
        <button className="btn success" onClick={grantAccess}>
          Grant Doctor Access
        </button>

        <hr />

        {/* DOCTOR SECTION */}
        <h2>👨‍⚕️ Doctor Panel</h2>

        <button className="btn primary" onClick={registerDoctor}>
          Register as Doctor
        </button>

        <input
          placeholder="Patient Address"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
        />
        <button className="btn primary" onClick={viewRecords}>
          View Patient Records
        </button>

        <div className="records">
          {records.map((r, i) => (
            <div key={i} className="record">
              <p><b>IPFS Hash:</b> {r.ipfsHash}</p>
              <p>
                <b>Time:</b>{" "}
                {new Date(Number(r.timestamp) * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <hr />

        {/* ADMIN SECTION */}
        <h2>👮 Admin Panel</h2>

        <input
          placeholder="Doctor Address"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
        />
        <button className="btn success" onClick={verifyDoctor}>
          Verify Doctor
        </button>

        <hr />

        {/* APPOINTMENT SECTION */}
        <h2>📅 Appointment Booking (Demo)</h2>
        <button className="btn success" onClick={bookAppointment}>
          Book Appointment
        </button>

        {appointments.map((a, i) => (
          <div key={i} className="record">
            <p><b>Patient:</b> {a.patient}</p>
            <p><b>Doctor:</b> {a.doctor}</p>
            <p><b>Date:</b> {a.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
