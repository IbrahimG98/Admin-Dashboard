import * as api from "../API/api";

export const getPosts = () => async (dispatch) => {
  try {
    let { data } = await api.getPosts();
    if(localStorage.getItem('DataPostedEdited'))
    {
      let newData=JSON.parse(localStorage.getItem('DataPostedEdited'));
      console.log(newData);
      data=[...data,newData];
    }
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};