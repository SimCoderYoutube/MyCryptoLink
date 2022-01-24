import { IconButton } from '@material-ui/core'
import React from 'react'
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Home.css';

export default function Home() {
    return (
        <main className='background-grad w-100 overflow-hidden'>
            <div className='container align-items-center justify-content-center overflow-hidden' >
                <div className="row">
                    <div className="col-md-7 col-12 align-content-center align-self-center ">
                        <div className="mb-4 pl-3">
                            <h1>MyCryptoLink</h1>
                            <h4>Share your wallets in a small, <span>easy</span> to share, link</h4>
                        </div>

                        <IconButton style={{color: 'black'}} onClick={() => window.open('https://goo.gl/vmnoaB')} >
                            <YouTubeIcon fontSize="large" />
                        </IconButton>

                        <IconButton style={{color: 'black'}} onClick={() => window.open('https://twitter.com/simcoder_here')} >
                            <TwitterIcon fontSize="large" />
                        </IconButton>

                        <IconButton style={{color: 'black'}} onClick={() => window.open('https://github.com/SimCoderYoutube')} >
                            <GitHubIcon fontSize="large" />
                        </IconButton>
                    </div>
                    <div className="col-md col preview-img-container">
                        <img src={require('../preview.png').default} />
                    </div>
                </div>

            </div>

        </main>
    );
}
