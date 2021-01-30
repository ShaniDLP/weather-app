import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './externalLinks.css';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const externalLinks = () => {
    return (
        <div className="externalLinks">
        <a href = "https://www.linkedin.com/in/shanip27" id="linkedin">
        <FontAwesomeIcon icon={faLinkedin}/>
        </a>
         
       
        <a href="https://github.com/shanipj" id="github">
        <FontAwesomeIcon icon={faGithubSquare}  />
        </a>
        </div>  
    )}

export default externalLinks;

