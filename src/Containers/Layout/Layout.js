import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
    render() {
        return(
            <React.Fragment>
                <Header />
                <div className='main-container'>
                    {
                        this.props.children
                    }
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default Layout;