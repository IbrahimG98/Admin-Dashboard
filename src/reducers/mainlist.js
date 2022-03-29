export default (mainlist=[], action) => {
    switch (action.type) {
      case "DELETE" :
        return mainlist.filter((post)=>post._id!=action.payload);
      case "UPDATE" :
        return mainlist.map((post) => (post._id === action.payload._id ? action.payload : post));
      case "FETCH_ALL":
        return action.payload;
      case "CREATE":
        return [...mainlist,action.payload];
  
      default:
        return mainlist;
    }
  };
  
  