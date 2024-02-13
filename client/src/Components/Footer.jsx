import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import {
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaGithub,
    FaGoogle,
    } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
// error with mdb react ui kit

export default function App() {
    return (
        <MDBFooter className='text-center bg-color' color='var(--onyx)' >
        <MDBContainer className='p-4'>
            <section className='mb-4'>
            {/* <MDBBtn outline color="white" floating className='m-1' href='#!' role='button'>
                <BsFacebook fab icon='facebook-f'/>
            </MDBBtn>

            <MDBBtn outline color="grey" floating className='m-1' href='#!' role='button'>
                <FaTwitter fab icon='twitter' />
            </MDBBtn> */}

            <MDBBtn outline color="black" floating className='m-1' href='#!' role='button'>
                <FaGoogle fab icon='google' />
            </MDBBtn>

            <MDBBtn outline color="black" floating className='m-1' href='#!' role='button'>
                <FaInstagram fab icon='instagram' />
            </MDBBtn>

            <MDBBtn outline color="black" floating className='m-1' href='https://www.linkedin.com/in/kwame-browne/' role='button'>
                <FaLinkedin fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn outline color="black" floating className='m-1' href='https://github.com/TheeCryptoKing' role='button'>
                <FaGithub fab icon='github' />
            </MDBBtn>
            </section>

            <section className=''>
            <form action=''>
                <MDBRow className='d-flex justify-content-center'>
                </MDBRow>
            </form>
            </section>

            <section className='mb-4 bg-color'>
            <p>
                As you continue to Support us, We continue to Support the Planet.<br/> From everybody in the BoldSKin Family we want to say Thank You for the oppourtunity! 
            </p>
            </section>

        </MDBContainer>

        <div className='text-center p-3 footer-footer' >
            <p> © 2020 Copyright &nbsp; : &ensp;
            <a className='text-black ' href='https://BoldSkinInc.com/'>
            BoldSkinInc.com
            </a>
            </p>
        </div>
        </MDBFooter>
    );
}