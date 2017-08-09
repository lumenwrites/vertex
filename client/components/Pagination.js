import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings } from '../actions/index';
import { Link } from 'react-router';

class Pagination extends Component {
    render() {
	var currentPage = parseInt(this.props.location.query.page ?
				   this.props.location.query.page : 1);
	var prevPage = currentPage - 1;
	var nextPage = currentPage + 1;	

	return (
	    <div className="pagination panel">
		<span className="step-links">
		    { currentPage > 1 ?
		    <Link to={""}
			  query={Object.assign({}, this.props.location.query,
					       {page:prevPage})}>
			<i className="fa fa-chevron-left left"></i>    
		    </Link>
		    : null }
		    <span className="current">
			Page {currentPage}
		    </span>
		    <Link to={""}
			  query={Object.assign({}, this.props.location.query,
					       {page:nextPage})}>
			<i className="fa fa-chevron-right right"></i>    
		    </Link>

		</span>
	    </div>
	);
    }
}


function mapStateToProps(state) {
    return { settings: state.settings.all };
}

export default connect(mapStateToProps, { fetchSettings })(Pagination);
