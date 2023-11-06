import axios from "axios";

const jwtToken: any = localStorage.getItem("jwt_token");
let localInfoQuery: any = null;

try {
  localInfoQuery = JSON.parse(jwtToken);
} catch (error) {
  // Handle the error or provide a default value if parsing fails
  // console.error("Error parsing JSON:", error);
  localInfoQuery = {}; // You can set a default value here
}

export async function axisFetch(requestInfo: any, requestInit: any) {
  try {
    const response = await axios(requestInfo, requestInit);
    return { status: response.status, body: response.data };
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        JSON.stringify({
          status: error.response.status,
          body: error.response.data,
        })
      );
    } else {
      throw error;
    }
  }
}

export async function getCarDetails() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  return axisFetch("http://localhost:8080/xyz/cars", {
    method: "GET",
    headers: headers,
  });
}

export async function getUserDetails() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch("http://localhost:8080/xyz/users", {
    method: "GET",
    headers: headers,
  });
}

export async function sendSlackMessage(text: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({ text: text });

  return axisFetch("http://localhost:8080/webhook/message/WWW", {
    method: "post",
    headers: headers,
    data: payload,
  });
}

export async function registerUser(
  username: any,
  password: any,
  firstName: any,
  lastName: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  return axisFetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: headers,
    data: payload,
  });
}

export async function loginUser(username: any, password: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({ username: username, password: password });

  return axisFetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: headers,
    data: payload,
  });
}

export async function postCar(
  make: any,
  model: any,
  registration: any,
  priceRange: any,
  carProfileImg: any,
  userEmail: any,
  status: any
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  const payload = JSON.stringify({
    make: make,
    model: model,
    registration: registration,
    priceRange: priceRange,
    carProfileImg: carProfileImg,
    userEmail: userEmail,
    status: status,
  });

  return axisFetch("http://localhost:8080/xyz/cars", {
    method: "POST",
    headers: headers,
    data: payload,
  });
}

export async function uploadUserDetails(
  userId: any,
  username: any,
  firstName: any,
  lastName: any,
  profileImage: any
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  const payload = JSON.stringify({
    username: username,
    firstName: firstName,
    lastName: lastName,
    profileImage: profileImage,
  });

  return axisFetch(`http://localhost:8080/xyz/users/${userId}`, {
    method: "PUT",
    headers: headers,
    data: payload,
  });
}

export async function viewUserDetailsByID(userId: any) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  return axisFetch(`http://localhost:8080/xyz/users/${userId}`, {
    method: "GET",
    headers: headers,
  });
}

export async function updateCarStatus(userId: any, status: any) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  const payload = JSON.stringify({
    status: status,
  });

  return axisFetch(`http://localhost:8080/xyz/car/status/${userId}`, {
    method: "PUT",
    headers: headers,
    data: payload,
  });
}
