import { connect } from 'react-redux'
import { fetchTracks } from '../../actions/track_actions'
import { fetchUser } from '../../actions/user_actions'
import Library from './library'


const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    tracks: state.entities.tracks
})

const mapDispatchToProps =  dispatch => (
    
    {
    fetchTracks: () => dispatch(fetchTracks()),
    fetchUser: (userId) => dispatch(fetchUser(userId))
    }
)



export default connect(mapStateToProps, mapDispatchToProps)(Library);