import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Vendor Components
/* import Helmet from 'react-helmet';*/
import { Grid, Row, Col } from 'react-bootstrap';

/* My Components */
import Header from './Header';
import Footer from './Footer';

export default class Main extends Component {
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
