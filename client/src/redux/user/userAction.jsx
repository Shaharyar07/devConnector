import { getUserPending, getUserSuccess, getUserFail } from "./userSlice";
import { fetchUser } from "../authentications/authUser";
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());
    const result = await fetchUser();
    const user = result.user;
    console.log("getUserProfile: ", result.user._id);
    if (user && user._id) {
      localStorage.setItem("user", user._id);
      console.log("dispatching getUserSuccess");
      return dispatch(getUserSuccess(user));
    } else {
      dispatch(getUserFail("User not Found"));
    }
  } catch (error) {
    dispatch(getUserFail(error));
  }
};
