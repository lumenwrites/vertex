import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings } from '../actions/index';

import MetaTags from 'react-meta-tags';
import removeMd from 'remove-markdown';

import Post from './Post';


class About extends Component {
    componentWillMount() {
	this.props.fetchSettings();	
    }

    renderMetaInfo () {
	const settings =  this.props.settings;
	const post = this.props.post;

	if (!settings) { return null; }
	/* Remove markdown from post body, and truncate it to 160 chars. */

	var body = ""
	var title = ""	
	if (settings.about) {
	    body = removeMd(settings.about);
	}
	const truncate_length = 160;
	const description = body.substring(0, truncate_length - 3) + "...";

	if (!settings.metaTitle) { return null; }
	return (
            <MetaTags>
		<title>{"About " + settings.metaTitle}</title>
		<meta name="author" content={settings.metaAuthor} />  
		<meta name="description"
		      content={description} />
		<meta name="keywords"
		      content={settings.metaKeywords} />		
            </MetaTags>
	);
    }

    
    render() {
	var about =  this.props.settings.about;

	if (!about) {return (<div></div>);}
	if (about == "") {
	    about = "To edit this text, go to /admin, create settings object, and fill in the info."
	}
	
	return (
	    <div>
		{ this.renderMetaInfo() }
		<Post title="About" published={true} body={about}/>
	    </div>	    
	);
    }
}

// Actions required to provide data for this component to render in sever side.
About.need = [() => { return fetchSettings(); }];

function mapStateToProps(state) {
    return { settings: state.settings };
}

export default connect(mapStateToProps, { fetchSettings })(About);
