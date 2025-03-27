import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("userService: No auth token found");
    return null; // Jelzi a hívónak, hogy nincs token
  }
  return {
    headers: {
      "Content-Type": "application/json", // Explicit JSON küldése
      "x-auth-token": token,
    },
  };
};

export const getUser = async () => {
  const config = getAuthConfig();
  // Itt nem dobunk hibát, ha nincs token, mert lehet, hogy csak ellenőrizni akarjuk
  // De a backendnek kellene 401-et adnia, ha kötelező a token

  try {
    // A config lehet null, ha nincs token, de a backendnek kell ezt kezelnie (authMiddleware)
    const response = await axios.get(`${API_BASE_URL}/users/me`, config || {}); // Küldjük a configot, ha van
    return response.data;
  } catch (error) {
    console.error("getUser Error:", error.response?.data || error.message);
    // Dobd tovább a hibát, hogy a komponens tudja kezelni
    throw (
      error.response?.data ||
      new Error(
        error.message || "Nem sikerült betölteni a felhasználó adatait!"
      )
    );
  }
};

export const updateUser = async (userData) => {
  const config = getAuthConfig();
  if (!config) {
    // Dobjunk hibát, mert a frissítéshez biztosan kell token
    throw new Error("Nem sikerült hitelesíteni a felhasználót a frissítéshez.");
  }

  try {
    console.log("Sending update data:", userData); // Log data being sent
    const response = await axios.put(
      `${API_BASE_URL}/users/me`,
      userData,
      config
    );
    console.log("Update response:", response.data); // Log successful response
    // Itt feltételezzük, hogy a backend a frissített user objektumot (vagy legalább egy sikeres üzenetet) ad vissza
    // Ha a backend pl. csak { success: true } választ ad, akkor a hívónak újra kell fetch-elnie a usert
    return response.data; // Return the whole response data
  } catch (error) {
    console.error("updateUser Error:", error.response?.data || error.message);
    // Dobjuk tovább a backend hibaüzenetét, ha van, különben az általánosat
    throw new Error(
      error.response?.data?.error ||
        "Nem sikerült frissíteni a felhasználói adatokat!"
    );
  }
};
