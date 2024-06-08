import React, { useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import upload_are from "../Assets/upload_area.svg";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  let navigate = useNavigate();

  const [image, setImage] = useState(false);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const { id } = useParams();
  // State to store user details
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    image: "",
  });
  // State to track loading state
  const [loading, setLoading] = useState(true);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Function to fetch user detail

    fetchUserDetails(); // Call the fetchUserDetails function when the component mounts
  }, []);
  const fetchUserDetails = async () => {
    try {
      // Make a GET request to the /me endpoint of your backend
      const response = await axios.get("http://localhost:4000/me", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: "",
      });

      // Update the user state with the fetched user details
      setUser(response.data.user);
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false); // Set loading to false even if an error occurs
    }
  };

  const update_profile = async () => {
    let reponseData;
    let users = user;

    let formData = new FormData();
    formData.append("user", image);

    await fetch("http://localhost:4000/userImg", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        reponseData = data;
      });
    if (reponseData.success) {
      user.image = reponseData.image_url;
      console.log(users);

      await axios.put(`http://localhost:4000/updateUser/${id}`, user, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      });
      navigate("/myprofile");
      window.location
        .reload()

        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("user updated done...!!!") : alert("failed");
        });
    }
  };
  return (
    <div className=" pt-10 pb-10 sm:pt-10 sm:pb-16 lg:pb-16 md:h-[92vh]">
      <div className=" mx-auto max-w-5xl px-4 sm:px-6 lg:px-3 py-5 bg-white rounded-3xl shadow-lg">
        <div className=" mb-4">
          <div className=" mb-6 max-w-3xl sm:text-center md:mx-auto">
            {localStorage.getItem("auth-token") ? (
              <div>
                {user ? (
                  // If user details are available, display them
                  <div>
                    <h2 className=" mb-4 font-bold capitalize tracking-tight text-black text-3xl sm:text-5xl">
                      Edit Your Details
                    </h2>
                    <div className=" mb-5">
                      <p className=" capitalize text-start font-bold text-lg">
                        UserName
                      </p>
                      <input
                        value={user.name}
                        onChange={changeHandler}
                        type="text"
                        name="name"
                        className=" mb-2 w-full capitalize rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
                        placeholder="Type Here"
                      />
                    </div>
                    <div className=" mb-5">
                      <p className=" capitalize text-start font-bold text-lg">
                        Email
                      </p>
                      <input
                        value={user.email}
                        onChange={changeHandler}
                        type="text"
                        name="email"
                        className=" mb-2 w-full  rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
                        placeholder="Type Here"
                      />
                    </div>
                    <div className=" mb-5">
                      <p className=" capitalize text-start font-bold text-lg">
                        Phone Number
                      </p>
                      <input
                        value={user.phoneNumber}
                        onChange={changeHandler}
                        type="text"
                        name="phoneNumber"
                        className=" mb-2 w-full capitalize rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
                        placeholder="Type Here"
                      />
                    </div>

                    <div className="">
                      <div>
                        <div className="addproduct-itemfield">
                          <label htmlFor="file-input">
                            <img
                              src={
                                image ? URL.createObjectURL(image) : user.image
                              }
                              className=" w-auto h-40"
                              alt="Uplode Here"
                            />
                          </label>
                          <input
                            onChange={imageHandler}
                            type="file"
                            name="image"
                            id="file-input"
                            hidden
                          />
                        </div>

                        <button
                          onClick={() => {
                            update_profile();
                          }}
                          className=" bg-black font-bold text-lg rounded-md text-white px-3 py-1"
                        >
                          Save Change
                        </button>
                        <Link to={"/myprofile"}>
                          <button className=" bg-black font-bold text-lg rounded-md text-white ml-4 px-3 py-1">
                            Back
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  // If user details are not available, display an error message
                  <div>Error fetching user </div>
                )}
              </div>
            ) : (
              <div>Error fetching user</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
