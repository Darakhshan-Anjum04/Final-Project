
import registerUser from './apiService'; // Importing the function correctly

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted", user);  // Confirm data is passed to the function

  try {
    const res = await registerUser(user);  // Use the registerUser function from apiService
    console.log("Response from server: ", res);  // Check the response
    alert(res.message);
  } catch (error) {
    console.error("Error during submission:", error);  // Check for errors in submission
    alert(error.message || "An error occurred.");
  }
};

export default handleSubmit;
