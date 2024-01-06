import axios from "axios";

const postGpt = async (
  chatId: number,
  currentUsername: string,
  message: string
) => {
  try {
    const requestData = {
      currentUsername,
      message,
    };

    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND}/gpt/${chatId}`,
      requestData,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchGpt = async (chatId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND}/gpt/${chatId}`,
      { withCredentials: true }
    );

    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
};

const createGpt = async (username: string) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND}/gpt`, {
      username,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteGpt = async (chatId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND}/gpt/${chatId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchGptList = async (username: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND}/gpt/user/${username}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
};

export default { postGpt, fetchGpt, createGpt, deleteGpt, fetchGptList };
