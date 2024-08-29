import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import * as Action from "../redux/question_reducer";

// Fetch questions hook
export const useFetchQestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading: false,
        apiData: [],
        serverError: null,
    });

    useEffect(() => {
        setGetData((prev) => ({ ...prev, isLoading: true }));

        // Async function to fetch backend data
        (async () => {
            try {
                const apiUrl = `${process.env.REACT_APP_API_URL}/api/questions`;
                const [{ questions, answers }] = await getServerData(apiUrl, (data) => data);

                if (questions.length > 0) {
                    setGetData((prev) => ({ ...prev, isLoading: false, apiData: questions }));
                    dispatch(Action.startExamAction({ question: questions, answers }));
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData((prev) => ({ ...prev, isLoading: false, serverError: error.message }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
};

// Move to next question
export const MoveNextQuestion = () => (dispatch) => {
    try {
        dispatch(Action.moveNextAction());
    } catch (error) {
        console.error("Error moving to next question:", error);
    }
};

// Move to previous question
export const MovePrevQuestion = () => (dispatch) => {
    try {
        dispatch(Action.movePrevAction());
    } catch (error) {
        console.error("Error moving to previous question:", error);
    }
};
