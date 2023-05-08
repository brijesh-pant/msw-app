import React, { useEffect, useReducer } from "react";
import { Loader } from "./components/Loader";
import { User } from "./components/User";
import { Error } from "./components/Error";

import { AppLayout } from "./layouts/AppLayout";
import "./App.css";

const fetchReducer = (state, action) => {
  if (action.type === "fetch") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "success") {
    return {
      data: action.data,
      error: null,
      loading: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: "Error fetching data. Try again",
      loading: false,
    };
  } else {
    throw new Error(`That action type isn't supported.`);
  }
};

const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    dispatch({ type: "fetch" });
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong.");
      })
      .then((data) => dispatch({ type: "success", data }))
      .catch((e) => {
        // console.warn(e.message);
        dispatch({ type: "error" });
      });
  }, [url]);

  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
  };
};

export default function App() {
  const {
    loading,
    data: users,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading === true) {
    return <Loader />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return (
    <AppLayout>
      {users.map((user) => (
        <User
          id={user.id}
          key={user.id}
          name={user.name}
          email={user.email}
          phone={user.phone}
        />
      ))}
    </AppLayout>
  );
}
