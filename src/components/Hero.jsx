//import { logo } from '../assets'
import Typewriter from "./Typewriter"
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Hero = () => {
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Set initial state

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
            <img src='/nradlogofullrmbg.png' alt="sumz_logo"
            className="w-40 object-contain" />
            <div className="space-x-4">
                {isMobileScreen ? (
                    <>
                        <button type="button" onClick={() => window.open('https://jeffmouritzen.com')} className="blue_btn">
                            <FontAwesomeIcon icon={faAddressBook} />
                        </button>
                        <button type="button" onClick={() => window.open('https://github.com/jm8gw')} className="purple_btn">
                            <FontAwesomeIcon icon={faGithub} />
                        </button>
                    </>
                ) : (
                    <>
                        <button type="button" onClick={() => window.open('https://jeffmouritzen.com')} className="blue_btn">
                            Visit My Website!
                        </button>
                        <button type="button" onClick={() => window.open('https://github.com/jm8gw')} className="purple_btn">
                            See My Github!
                        </button>
                    </>
                )}
            </div>
        </nav>

        <h1 className="head_text">
            {/*<span className="logo_gradient">{`Life's Too Short To Read All Dat.`}</span>*/}
            <Typewriter text="Life's Too Short To Read All Dat." delay={100} /> 
            <br/><br/> Summarize Your Articles with <br className="max-md:hidden"/>
            <span className="blue_gradient"> OpenAI GPT-4</span>
        </h1>
        <h2 className="desc">
            Paste the link to a fully-fledged article below, and allow the wonders of AI to condense it into a quick and easy-to-read summary! <br/> Nobody has to know you never actually read it {':)'}
        </h2>
    </header>
  )
}

export default Hero