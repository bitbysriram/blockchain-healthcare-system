// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Healthcare {

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    // ---------- STRUCTS ----------
    struct Doctor {
        string licenseId;
        bool verified;
    }

    struct MedicalRecord {
        string ipfsHash;
        uint256 timestamp;
    }

    // ---------- STORAGE ----------
    mapping(address => Doctor) public doctors;
    mapping(address => MedicalRecord[]) private records;
    mapping(address => mapping(address => bool)) public accessGranted;

    // ---------- MODIFIERS ----------
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    modifier onlyAuthorizedDoctor(address patient) {
        require(doctors[msg.sender].verified, "Doctor not verified");
        require(accessGranted[patient][msg.sender], "Access not granted");
        _;
    }

    // ---------- DOCTOR ----------
    function registerDoctor(string memory _licenseId) public {
        doctors[msg.sender] = Doctor(_licenseId, false);
    }

    function verifyDoctor(address _doctor) public onlyAdmin {
        doctors[_doctor].verified = true;
    }

    // ---------- PATIENT ----------
    function addMedicalRecord(string memory _ipfsHash) public {
        records[msg.sender].push(
            MedicalRecord(_ipfsHash, block.timestamp)
        );
    }

    function grantAccess(address _doctor) public {
        require(doctors[_doctor].verified, "Doctor not verified");
        accessGranted[msg.sender][_doctor] = true;
    }

    function revokeAccess(address _doctor) public {
        accessGranted[msg.sender][_doctor] = false;
    }

    // ---------- VIEW ----------
    function getMedicalRecords(address _patient)
        public
        view
        onlyAuthorizedDoctor(_patient)
        returns (MedicalRecord[] memory)
    {
        return records[_patient];
    }
}
