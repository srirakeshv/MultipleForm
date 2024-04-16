import React, { useState } from "react";
import "./css/form.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

const Form = () => {
  const [inputData, setInputData] = useState({
    candidatename: "",
    email: "",
    phonenumber: "",
  }); //initializing the data
  const [allData, setAllData] = useState([]); //updating array of data
  const [emailError, setEmailError] = useState(""); //error for email
  const [candidatenameError, setCandidatenameError] = useState(""); //error for candidatename
  const [phoneError, setPhoneError] = useState(""); //error for phoneerror
  const [done, setDone] = useState(null); //setting tick mark trua and false
  const [updatedData, setUpdatedData] = useState({
    updatecandidatename: "",
    updateemail: "",
    updatephonenumber: "",
  }); //initializing the data for updating

  //tracking onchange events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "candidatename") {
      setCandidatenameError("");
    } else if (name === "email") {
      setEmailError("");
    } else {
      setPhoneError("");
    }
  };

  //onsubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset previous errors
    setCandidatenameError("");
    setEmailError("");
    setPhoneError("");

    let hasError = false;

    // Checking candidatename
    if (inputData.candidatename === "") {
      setCandidatenameError("Name should not be empty");
      hasError = true;
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Checking email
    if (inputData.email === "") {
      setEmailError("Email should not be empty");
      hasError = true;
    } else if (!emailPattern.test(inputData.email)) {
      setEmailError("Invalid email address");
      hasError = true;
    }

    // Checking phonenumber
    if (inputData.phonenumber === "") {
      setPhoneError("Phonenumber should not be empty");
      hasError = true;
    } else if (inputData.phonenumber.length !== 10) {
      setPhoneError("Phonenumber must be a length of 10");
      hasError = true;
    }

    // Submit the form if no errors
    if (!hasError) {
      setAllData((data) => [...data, inputData]);
      setInputData({
        candidatename: "",
        email: "",
        phonenumber: "",
      });
    }
  };

  //delete the row
  const handleDelete = (index) => {
    setAllData((prevData) => {
      // Filter out the item with the specified index
      return prevData.filter((_, idx) => idx !== index);
    });
  };

  //update the row
  const handleEdit = (index, data) => {
    //passing that particular index data to input field
    setUpdatedData({
      updatecandidatename: data.candidatename,
      updateemail: data.email,
      updatephonenumber: data.phonenumber,
    });
    setDone(index);
  };

  //handletick
  const handleTickmark = (index) => {
    // e.preventDefault();
    console.log(updatedData);
    //updating that particluar index in the original data
    setAllData((prev) => {
      const newData = [...prev];
      newData[index] = {
        candidatename: updatedData.updatecandidatename,
        email: updatedData.updateemail,
        phonenumber: updatedData.updatephonenumber,
      };
      return newData;
    });
    setDone(-1);
  };

  // handle onChange for editable fields
  const handleEditFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="flex justify-center items-center p-2"
      style={{ minHeight: "100vh" }}
    >
      <div className="max-w-5xl w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex flex-col gap-2">
              <input
                type="text"
                name="candidatename"
                placeholder="candidatename"
                value={inputData.candidatename}
                className="border-2 border-blue-500 outline-none rounded-md p-2"
                onChange={handleChange}
              />
              <p className="text-red-600 text-xs">{candidatenameError}</p>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <input
                type="text"
                name="email"
                placeholder="example@gmail.com"
                value={inputData.email}
                className="border-2 border-blue-500 outline-none rounded-md p-2"
                onChange={handleChange}
              />
              <p className="text-red-600 text-xs">{emailError}</p>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <input
                type="number"
                name="phonenumber"
                placeholder="phonenumber"
                value={inputData.phonenumber}
                className="border-2 border-blue-500 outline-none rounded-md p-2"
                onChange={handleChange}
              />
              <p className="text-red-600 text-xs">{phoneError}</p>
            </div>
          </div>
          <button
            type="submit"
            className="self-center px-6 py-3 bg-blue-600 rounded-md text-white"
          >
            Submit
          </button>
        </form>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-blue-500">
                <td className="px-2 py-3">Candidatename</td>
                <td className="px-2 py-3">Email</td>
                <td className="px-2 py-3">Phonenumber</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {allData.length >= 1 &&
                allData.map((data, index) => (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-blue-300" : "bg-gray-100"
                    }`}
                    key={index}
                  >
                    <td className="px-2 py-3">
                      {done === index ? (
                        <input
                          className="p-2 rounded-md outline-none"
                          type="text"
                          name="updatecandidatename"
                          value={updatedData.updatecandidatename}
                          onChange={handleEditFieldChange}
                        />
                      ) : (
                        <p>{data.candidatename}</p>
                      )}
                    </td>
                    <td className="px-2 py-3">
                      {done === index ? (
                        <input
                          className="p-2 rounded-md outline-none"
                          type="text"
                          name="updateemail"
                          value={updatedData.updateemail}
                          onChange={handleEditFieldChange}
                        />
                      ) : (
                        <p>{data.email}</p>
                      )}
                    </td>
                    <td className="px-2 py-3">
                      {done === index ? (
                        <input
                          className="p-2 rounded-md outline-none"
                          type="text"
                          name="updatephonenumber"
                          value={updatedData.updatephonenumber}
                          onChange={handleEditFieldChange}
                        />
                      ) : (
                        <p>{data.phonenumber}</p>
                      )}
                    </td>
                    <td>
                      {done === index ? (
                        <button
                          className="bg-green-600 text-white rounded-md p-2 px-4"
                          onClick={() => handleTickmark(index)}
                        >
                          <DoneIcon /> Update
                        </button>
                      ) : (
                        <button
                          className="bg-blue-600 text-white rounded-md p-2 px-4"
                          onClick={() => handleEdit(index, data)}
                        >
                          <EditIcon /> Edit
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="bg-red-600 text-white rounded-md p-2 px-4"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Form;
