import styled from "styled-components";

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
      <h1>Hi There!</h1>
    </Wrapper>
  );
}

export default App;
