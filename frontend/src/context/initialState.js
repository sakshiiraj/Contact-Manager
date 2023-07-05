const getUser = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { email: "NA", token: "NA" };
};

const initialState = {
  user: getUser(),
  contact: [],
  filter: [],
  mark: {},
  isChecked: false,
};

export default initialState;