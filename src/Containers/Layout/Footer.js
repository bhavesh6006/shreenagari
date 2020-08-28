import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return(
            <footer>
                <span>
                    ©2020
                </span>

                <span style={{ paddingLeft: '8px', color: "hsl(163, 43%, 54%)" }}>
                    Developed by Bhavesh Shah
                </span>
            </footer>
        )
    }
}

export default Footer;