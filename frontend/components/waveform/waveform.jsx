import React, { Component } from 'react';

import { PlayButton } from './playbutton';
import { WaveformContainer } from './waveform_container';
import { Wave } from './wave';

import WaveSurfer from 'wavesurfer.js';


class Waveform extends Component {
    state = {
        playing: false
    };

    componentDidMount() {
        const track = document.querySelector('#track');

        this.waveform = WaveSurfer.create({
            barWidth: 3,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'WebAudio',
            height: 80,
            progressColor: '#2D5BFF',
            responsive: true,
            waveColor: 'orange',
            cursorColor: 'transparent',
        });

        this.waveform.load(track);
    };

    handlePlay = () => {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
    };

    render() {
        

        return (
            <WaveformContainer className="waveform-div">
                <PlayButton onClick={this.handlePlay} >
                    {!this.state.playing ? 'Play' : 'Pause'}
                    {/* add icons to 'Play' and 'Pause' */}
                </PlayButton>
                <Wave id="waveform" />
                <audio id="track" src={this.props.track.audioUrl} />
            </WaveformContainer>
        );
    }
};

export default Waveform;