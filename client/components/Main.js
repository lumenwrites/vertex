import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Vendor Components
/* import Helmet from 'react-helmet';*/
import { Grid, Row, Col } from 'react-bootstrap';


// Styles
/* 
import '../styles/bootstrap.min.css';
import '../styles/font-awesome.min.css';
import '../styles/foundation-icons.css';
import '../styles/simplemde.min.css';
import '../styles/style.scss';
*/

/* My Components */
import Header from './Header';
import Footer from './Footer';

class Main extends Component {
    render() {
	/* For child routers */
	const { children } = this.props;
	return (
	    <div className="mainWrapper">
		<Header />
		<div className="page">
		    <Grid>
			<Row className="show-grid">
			    <Col xs={12} md={12}>
				{ children }
			    </Col>
			</Row>
		    </Grid>
		</div>
		<Footer />		
	    </div>
	);
    }
}

export default Main;
