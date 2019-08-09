import React from 'react';
// import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from '../Styles/Theme';
import Router from './Router';
// import { useQuery } from "react-apollo-hooks";
import { defaults } from "../Apollo/LocalState";
import Footer from "./Footer";

// const QUERY = gql`{
//     isLoggedIn @client
// }`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  // const { data: { isLoggedIn } } = useQuery(QUERY);
  // console.log(isLoggedIn);
  console.log(defaults.isLoggedIn);
  
  return (
  <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Wrapper>
        <Router isLoggedIn={defaults.isLoggedIn}/>
        <Footer />
      </Wrapper>
    </>
  </ThemeProvider>
  );
}