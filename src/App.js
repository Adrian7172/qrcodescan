import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import QRcode from "qrcode";
import  QrReader  from 'react-qr-reader';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (<>

    <Nav>
      <h3>QR SCAN</h3>
    </Nav>
  </>);
}
const Home = () => {
  const [text, setText] = useState("");
  const [src, setSrc] = useState("");



  const generateQrCode = () => {
    try {
      QRcode.toDataURL(text).then((data) => {
        setSrc(data);
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (<>

    <Navbar />
    <Container>
      <div>Generate & Scan QR Code</div>
      <InputContainer>
        <StyledInput type="text" placeholder="Enter text" onChange={(e) => setText(e.target.value)} />
        <StyledIcons onClick={generateQrCode}>Generate</StyledIcons>
      </InputContainer>
      <DisplayContainer>

        {src ? (
          <a href={src} download>
            <img src={src} alt="QR image" /></a>) : <h3>Enter text to generate the QR code</h3>
        }
      </DisplayContainer>

      <ScanContainer>

        <NavLink className="navlink" to="/scanfile">Scan QR code</NavLink>
      </ScanContainer>

    </Container>

  </>);
}
const ScanFile = () => {
  const qrRef = useRef(null);
  const [scanResult, setScanResult] = useState('')


  const handleErrorFile = (error) => {
    console.log(error)
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResult(result);
    }
  }

  const onScan = () => {
    qrRef.current.openImageDialog();
  }



  return (<>
    <Navbar />
    <Container>
       <ScanFileContainer>
       <QrReader 
       className='qrreader'
       ref={qrRef}
       delay={300}
      //  style={{width:"100%"}}
       onError={handleErrorFile}
       onScan = {handleScanFile}
       legacyMode
       
       />
       <div>
        <Scan onClick={onScan}>Scan QR code</Scan>
      <h3>Scanned code:<span>{scanResult}</span> </h3>
      <NavLink className="navlink" to="/scancam">Scan By Camera</NavLink>
      <NavLink className="navlink" to="/">Back</NavLink>
   </div>
   </ScanFileContainer>
    </Container>
  </>);
}
const ScanCam = () => {
const [scanResultCam, setScanResultCam] = useState("");
  const handleErrorCam= (error) => {
    console.log(error)
  }
  const handleScanCam = (result) =>{
    if(result){
        setScanResultCam(result);
    }
  }
  return (<>
    <Navbar />
    <Container>
    <ScanFileContainer>
      <QrReader
      delay={300}
      style={{width: '60%'}}
      onError={handleErrorCam}
      onScan={handleScanCam}

      />
      <br />
      <div>
      <h3>Scanned code:<span>{scanResultCam}</span> </h3>
      <NavLink className="navlink" to="/scanfile">Back</NavLink>
      </div>
      </ScanFileContainer>
    </Container>
  </>);
}



const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/scanfile" element={<ScanFile />} />
        <Route path="/scancam" element={<ScanCam />} />
      </Routes>
    </>
  );
}

const Nav = styled.nav`
  max-width: 100%;
  margin: auto;
  padding: 12px 26px;
  position: relative;
  color: red;
  box-shadow: 0px 2.98256px 7.4564px rgba(0, 0, 0, 0.1)  ;
`;
const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
max-width: 100%;
height: 100vh;
padding-top: 30px;
div{
  color: red;
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
}
`;

const InputContainer = styled.div`
width: 600px;
height: 10rem;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
@media (max-width: 768px) {
   width: 90%;
  }
`;
const StyledInput = styled.input`
background: transparent;
box-shadow: inset 0 0 0 0.5px #6d685d;
border-radius: 5px;
width: 90%;
height: 1rem;

padding: 1rem;
border: none;
outline: none;
font-size: 1rem;
color: #4b4b4b;
letter-spacing: 0.05rem;
&:hover{
    background-color: #fff;
}
&:focus{
    display: inline-block;
    background-color: #fff;
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.6);
    
}
`;
const StyledIcons = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 95%;
  margin-top: 20px;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%) inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 18px;
  color: green;
  
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: green;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%);
    
    cursor: pointer;
  }
`;
const DisplayContainer = styled.div`
width: 600px;
height: 250px;
display: flex;
align-items: center;
justify-content: center;
a{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
 img{
  width:40%;
  height: auto;
}
@media (max-width: 768px) {
   width: 90%;
  }`;

const ScanContainer = styled.div`
width: 600px;
height: 100px;
color: red;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
.navlink{
  border: 1px solid rgba(0, 0, 0, 0.6);
  color: red;
  text-decoration: none;
display: flex;
justify-content: center;
background-color: #fff;
align-items: center;
height: 56px;
width: 95%;
margin-top: 20px;
border-radius: 28px;
box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%) inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0%);
vertical-align: middle;
  z-index: 0;
transition-duration: 167ms;
font-size: 18px;

&:hover {
  background-color: rgba(207, 207, 207, 0.25);
  color: red;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%);
  
  cursor: pointer;
}
}

@media (max-width: 768px) {
   width: 90%;
  }
  `;
const ScanFileContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 40px;
padding: 10px;
flex-direction: column;
width: 600px;
height: auto;
@media (max-width: 768px) {
  margin-top: 0;
  padding:10px;
  width:100%;
  height: auto;
}
div{
  width: 450px;
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  h3{
    overflow-x: scroll;
    margin-top: 20px;
    width: 80%;
    
    span{
      color: green;
      font-weight: 500;
      margin-left: 10px;
    }
  }
}
.qrreader{
  margin-top: 20px;
  width: 50%;
  
}
.navlink{
  border: 1px solid rgba(0, 0, 0, 0.6);
  color: red;
  text-decoration: none;
display: flex;
justify-content: center;
background-color: #fff;
align-items: center;
height: 56px;
width: 90%;
margin-top: 20px;
border-radius: 28px;
box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%) inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0%);
vertical-align: middle;
  z-index: 0;
transition-duration: 167ms;
font-size: 18px;

&:hover {
  background-color: rgba(207, 207, 207, 0.25);
  color: red;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%);
  
  cursor: pointer;
}
}
`;
const Scan = styled.button`
 border: 1px solid rgba(0, 0, 0, 0.6);
margin-top: 20px;
display: flex;
justify-content: center;
background-color: #fff;
align-items: center;
height: 56px;
width: 90%;
border-radius: 28px;
box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%) inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0%);
vertical-align: middle;
z-index: 0;
transition-duration: 167ms;
font-size: 18px;
color: green;

&:hover {
  background-color: rgba(207, 207, 207, 0.25);
  color: green;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%);
  
  cursor: pointer;
}
`;


export default App