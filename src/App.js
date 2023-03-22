import React from "react";
import FileUpload from "./FileUpload";
import S3ListImg from "./S3ListImg";

const App = () => {
  const [fileChanged, setFileChanged] = React.useState(false);
  return (
    <>
      <FileUpload setFileChanged={setFileChanged} />
      <S3ListImg fileChanged={fileChanged} setFileChanged={setFileChanged} />
    </>
  );
};

export default App;
