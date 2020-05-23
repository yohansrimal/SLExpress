import React from "react";
import "./App.css";
import AppRouter from "../src/routes/AppRouter";
import styled from "styled-components";
import Footer from "../src/components/DeveloperComponents/DeveloperNavigation/DevFooter";

function App() {
  return (
    <MainContainer>
      <MainContent>
        <AppRouter />
      </MainContent>

      <Footer />
    </MainContainer>
  );
}

export default App;

const MainContent = styled.div`
  flex: 1;
`;

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
