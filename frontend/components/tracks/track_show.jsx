import React from 'react';

import Waveform from '../waveform/waveform';

class TrackShow extends React.Component{
    constructor(props){
        super(props)
    }


    componentDidMount(){
        this.props.fetchTrack(this.props.trackId)
    }

    render(){

        const {track, currentUser} = this.props;

        if ((track === undefined)){
            return null
        }else if(currentUser){
            return (
                <> 
                    <Waveform />    
                </>
            )
        }

        
    }
}


export default TrackShow