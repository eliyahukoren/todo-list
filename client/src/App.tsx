import styled from "styled-components";
import Layout from "./components/Layout";

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#dbdbdb",
  minHeight: "100vh",
  maxHeight: "100%",
});

function App() {
  return (
    <Wrapper>
      <Layout />
    </Wrapper>
  );
}

export default App;
