import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-responsive-modal';
import LogInFormContainer from '../session_form/login_form_container';
import SignUpFormContainer from '../session_form/signup_form_container';
import SearchContainer from '../search/search_container';

// import mars from '../../../app/assets/images/moon.jpg';


class Header extends React.Component{
    
    constructor(props){
        super(props)

        this.state = {
            signup: false,
            signin: false
        }

        this.handleClickTab = this.handleClickTab.bind(this);
        this.openModalSignUp = this.openModalSignUp.bind(this);
        this.openModalSignIn = this.openModalSignIn.bind(this);
    }


    openModalSignUp = () => {
        this.setState({
            signup: true
        })
    };

    hideModalSignUp = () => {
        this.setState({
            signup: false
        })
    };

    openModalSignIn= () => {
        this.setState({
            signin: true
        })
    }

    hideModalSignIn = () => {
        this.setState({
            signin: false
        })
    }

    handleClickTab(e){
        const currEle = e.currentTarget;
        currEle.classList.add('selected');
    }

    handleLogout(){

        const result = window.location.origin;
        this.props.logout().then(
            window.location.href = result
        )
    }

    render(){
        const {signup, login, logout, currentUser} = this.props
        const search = <FontAwesomeIcon icon={faSearch}/>

        const settings = {
            dynamicHeigt: true,
            infiniteLoop: true,
            autoPlay: true,
            interval: 5000,
            showArrows: false,
            showStatus: false,
            showIndicators: false,
            showThumbs: false,
            swipeable: false,
            centerMode: true,
            width: 1268
        }

        const sliderPhotos = [
            {
                name: "Slider1",
                url: "https://srv4.imgonline.com.ua/result_img/imgonline-com-ua-resize-BO1new8u9s.jpg"
            },
            {
                name: "Slider2",
                url: "https://images.unsplash.com/photo-1466907840060-8934465084e5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fG5pZ2h0bGlmZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            },
            {
                name: "Slider3",
                url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbmNlcnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            }
        ]
        // Not Logged In
        const sessionLinks = () => (
            
            <div>
                
                <nav className="nav-header">
                    <Link to="/" id="header-link">Sonar</Link>

                    <button 
                        type="button"
                        className="nav-button"
                        id="sign-in-button"
                        onClick={this.openModalSignIn}
                        >Sign in
                    </button>
                        <Modal 
                            open={this.state.signin} 
                            onClose={this.onCloseModal}
                            formType={this.state.formType}
                            >
                            <LogInFormContainer />
                        </Modal>

                    <br />
                    <button 
                        className="nav-button" 
                        id="sign-up-button"
                        onClick={this.openModalSignUp}
                        >
                    Create account</button>
                        <Modal 
                            open={this.state.signup}
                            onClose={this.onCloseModal}
                            formType={this.state.formType}
                            >
                            <SignUpFormContainer />
                        </Modal>
                    <br />

                    <label htmlFor="For Creators" id="nav-label-creator">For Creators</label>
                    <Carousel {...settings} className="carousel">
                    {sliderPhotos.map((photo, idx) => {
                        return(
                            <div>
                                <img key={idx} className="carousel-photo" src={photo.url} alt={photo.name} />
                            </div>
                        )
                    })}
                    </Carousel>
                </nav> 
            </div>
        )

        // If Logged In
        const personalSpace = () => (
            <div>
                <nav className="nav-header">
                    <div className="left-nav-header">
                        <Link 
                        to="/"
                        className="nav-header-label"
                        onFocus={this.handleClickTab}
                        >Home
                            <span className="selected" id="selected"></span>
                        </Link>
                        <br />
                        <Link
                            to="/stream"
                            className="nav-header-label"
                            id="nav-header-upload"
                            onFocus={this.handleClickTab}
                        >Stream
                            <span className="selected" id="selected"></span>
                        </Link>
                    </div>
                        <br />
                        <Link
                            to="/upload"
                            className="nav-header-label"
                            id="nav-header-upload"
                            onFocus={this.handleClickTab}
                        >Upload
                            <span className="selected" id="selected"></span>
                        </Link>
                    <div className="middle-nav-hedaer">
                        <SearchContainer />
                    </div>
                    <div className="right-nav-header">

                    <a htmlFor="Logout"
                    className="header-nav-setting"
                    onClick={() => this.handleLogout()}>Log out</a>
                    </div>
                </nav>
            </div>
        )

            return currentUser ?  personalSpace() :  sessionLinks()
    }
}

export default Header;