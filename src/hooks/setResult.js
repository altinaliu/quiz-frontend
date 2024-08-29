import { postServerData } from "../helper/helper";
import * as Action from "../redux/result_reducer";

// Environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Push answer action
export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result));
    } catch (error) {
        console.error("Error pushing answer:", error);
    }
};

// Update result action
export const updateResult = (payload) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(payload));
    } catch (error) {
        console.error("Error updating result:", error);
    }
};

// Insert user data
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if (!result.length || !username) {
                throw new Error("Couldn't get Result: Invalid result or username.");
            }
            const response = await postServerData(
                `${API_URL}/api/result`,
                resultData
            );
            console.log("Result published:", response);
        } catch (error) {
            console.error("Error publishing result:", error);
        }
    })();
};
