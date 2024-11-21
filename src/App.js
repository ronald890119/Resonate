import styles from "./App.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadAsync } from "./state/userSlice";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";

function App() {
  // Dispatch for redux
  const dispatch = useDispatch();

  // Fetch data from API once page loaded
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        dispatch(loadAsync(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <label>Contacts</label>
      <HomePage />
    </div>
  );
}

export default App;
