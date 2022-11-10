import { Fab, IconButton } from '@material-ui/core'
import React from 'react'
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';


export default function Home() {
    return (
        <div className='background-grad w-100 overflow-hidden' style={{ height: 'calc(100vh - 64px)' }}>
            <div className='container align-items-center justify-content-center overflow-hidden' style={{ height: 'calc(100vh - 60px)' }}>
                <div className="row">
                    <div className="col-md-7 col-12 align-content-center align-self-center ">
                        <div className="mb-4 pl-3">
                            <h1 style={{ fontWeight: 'bold', fontSize: 50, marginBottom: 10 }}>MyCryptoLink</h1>
                            <h4 style={{}}>Share your wallets in a small, <span style={{ fontWeight: 'bold' }}>easy</span> to share, link</h4>
                        </div>

                        <IconButton style={{color: 'black'}} onClick={() => window.open('https://goo.gl/vmnoaB')} >
                            <YouTubeIcon fontSize="large" color="black" />
                        </IconButton>

                        <IconButton style={{color: 'black'}} onClick={() => window.open('https://twitter.com/simcoder_here')} >
                            <TwitterIcon fontSize="large" color="black" />
                        </IconButton>

                        <IconButton style={{color: 'black'}} onClick={() => window.open('https://github.com/SimCoderYoutube')} >
                            <GitHubIcon fontSize="large" color="black" />
                        </IconButton>
                    </div>
                    <div className="col-md col" style={{ height: 'calc(100vh - 64px)' }}>
                        <img src={require('../preview.png').default} style={{ height: '100%', width: '100%', objectFit: 'contain', padding: 50 }} />
                    </div>
                </div>

            </div>

        </div>
    )
}
