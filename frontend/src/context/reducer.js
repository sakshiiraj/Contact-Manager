export const actionType = {
  ADD_USER: "add user",
  ADD_CONTACT: "add contact",
  ADD_MARK: "add marked filed",
  REMOVE_USER: "remove contact",
  CHECKED: "check all the box",
  REMOVE_MARK: "remove the marked object",
  SEARCH: "filter the obj",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ADD_USER:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user };

    case actionType.ADD_CONTACT:
      return {
        ...state,
        contact: action.payload.contact,
      };

    case actionType.ADD_MARK:
      const newMark = state.mark;
      if (newMark[action.payload.id]) {
        delete newMark[action.payload.id];
      } else {
        newMark[action.payload.id] = 1;
      }
      // console.log(Object.keys(newMark).length, state.contact.length);
      if (Object.keys(newMark).length === state.contact.length) {
        return {
          ...state,
          mark: newMark,
          isChecked: true,
        };
      } else {
        return {
          ...state,
          mark: newMark,
          isChecked: false,
        };
      }

    case actionType.REMOVE_MARK:
      return {
        ...state,
        mark: {},
      };

    case actionType.REMOVE_USER:
      localStorage.setItem(
        "user",
        JSON.stringify({ email: "NA", token: "NA" })
      );
      return {
        ...state,
        user: { email: "NA", token: "NA" },
      };

    case actionType.CHECKED:
      // console.log(!state.isChecked);
      const checkMark = {};

      state.contact.forEach((ele) => {
        checkMark[ele._id] = 1;
      });
      if (state.isChecked) {
        return {
          ...state,
          mark: {},
          isChecked: !state.isChecked,
        };
      }
      return {
        ...state,
        mark: checkMark,
        isChecked: !state.isChecked,
      };

    case actionType.SEARCH:
      const arr = [];
      state.contact.forEach((obj) => {
        if (
          obj.email.toLowerCase().includes(action.payload.key.toLowerCase())
        ) {
          arr.push(obj);
        }
      });

      return { ...state, filter: arr };

    default:
      return state;
  }
};

export default reducer;