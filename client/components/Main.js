import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Vendor Components
/* import Helmet from 'react-helmet';*/
import { Grid, Row, Col } from 'react-bootstrap';

/* Styles */
import '../styles/bootstrap.min.css';
import '../styles/style.scss';

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
/* 
<div>
<Helmet
title="MERN Starter - Blog Main"
titleTemplate="%s - Blog Main"
meta={[
    { charset: 'utf-8' },
    {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
    },
    {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
    },
]}
/>
<Header
toggleAddPost={this.toggleAddPostSection}
/>
<div className={styles.container}>
{this.props.children}
</div>
<Footer />
</div>
*/
