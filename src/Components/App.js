import React from 'react';
// import { gql } from "apollo-boost";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from '../Styles/Theme';
import Router from './Router';
// import { useQuery } from "react-apollo-hooks";
import { defaults } from "../Apollo/LocalState";

// const QUERY = gql`{
//     isLoggedIn @client
// }`;

export default () => {
  // const { data: { isLoggedIn } } = useQuery(QUERY);
  // console.log(isLoggedIn);
  console.log(defaults.isLoggedIn);
  
  return (
  <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router isLoggedIn={defaults.isLoggedIn}/>
    </>
  </ThemeProvider>
  );
}