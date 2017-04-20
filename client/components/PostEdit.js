import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

import { FormGroup, FieldGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import SimpleMDE from 'react-simplemde-editor';


class PostEdit extends Component {
    /* Access properties from context */
    /* Router creates context, and this thing takes it */
    static contextTypes = {
	router: PropTypes.object
    };

    constructor(props){
	super(props);
	/* Set empty state to avoid errors before post is fetched */
	this.state = {
	    body:"",
	    published: false,
	    tags: ""
	};
	
	/* So that I would be able to access this component with "this"
	   inside the functions: */
	this.onTagsChange = this.onTagsChange.bind(this);
	this.onPublishClick = this.onPublishClick.bind(this);		
    }

    componentDidUpdate(prevProps){
	this.editor.simplemde.codemirror.options.extraKeys['Tab'] = false;
    }
    componentWillMount() {
	/* this.props.params.slug is the post slug passed here by the router.
	   If it's there - I want to fetch the post,
	   and populate the form with it's data.
	   If it isn't there - that means I'm at the "/post/new",
	   and I'll have an empty form for writing a new post. */
	if (this.props.params.slug) {
	    /* call action creator */
	    /* action creator will fetch the post from the API   */
	    /* and send it to the reducer */
	    /* reducer will add it to the redux state */
	    /* Which will be rendered into the form */
	    this.props.fetchPost(this.props.params.slug);
	}
    }


    /* Every time I type into the form - update the state. */
    /* There's probably a smarter way to do this. */
    onTagsChange(event) {
	this.setState({ tags: event.target.value });
    };
    onPublishClick(event) {
	/* Flip published state */
	/* this.setState({ published: !this.state.published });	*/

	const { body, tags } = this.state;
	const published = !this.state.published;
	const post = { published, tags };
	this.props.updatePost(this.props.params.slug, post);
    }
    onDelete() {
	/* Calling an action creator that deletes the post */
	this.props.deletePost(this.props.params.slug);
    }
    

    renderDeleteButton () {
	/* If I'm editing a post (and not creating a new one) - render delete button. */
	if (this.props.params.slug) {
	    return (	
		    <Button onClick={this.onDelete.bind(this)}>
			Delete Post
		    </Button>
	    );
	} else {
	    return null;
	}

    }

    renderPublishButton () {
	if (!this.props.post) {return null;}
	console.log("State: \n" + JSON.stringify(this.state));
	if (!this.state.published) {
	    return (	
		    <Button onClick={this.onPublishClick}>Publish</Button>
	    );
	    } else {
		return (	
			<Button onClick={this.onPublishClick}>Un-Publish</Button>
		);
	}
    }

    
    render() {
	/* Grabbing the post from the redux state
	   (connected to this component at the end of this file) */
	const { postForm } = this.props;
	var postLength = postForm.body.length + postForm.tags.length;

	return (
	    <div className="post-editor">
		{/* Body */}
		<SimpleMDE
		    onChange={this.props.updatePostBody}
		    value={this.props.postForm.body}
		    ref={(input) => { this.editor = input; }} 
		    options={{
			spellChecker: false,
			toolbar: false,
			status: false,
			placeholder: "Write here... (can use markdown)",
			initialValue: this.props.postForm.body,
			autosave: {
			    enabled: false,
			    delay: 1000,
			    uniqueId: "NewPost",
			    delay: 1000,
			},
			indentWithTabs: false,
			tabSize: 4,
			shortcuts: {
			    "indent": null //unbind tab
			}
		    }}/>
		{/* Tags.
		    If there are no categories - I'm not rendering
		    the categories selector, so I need to make the
		    width 100%. */}			
		<FormControl className={"post-tags force-fullwidth"}
			     type="text"
			     placeholder="tag1, tag2, tag3"
			     value={this.props.postForm.tags}
			     onChange={(event)=>
				 this.props.updatePostTags(event.target.value)}/>
		<div className={"character-count form-control " +
				 (postLength > 100 ? "red" : "")}>
		    { postLength }
		</div>
		<Button className="post-button" bsStyle="primary"
			onClick={()=>this.props.createPost(this.props.postForm)}>Post</Button>
		<div className="clearfix"></div>
	    </div>
	);
    }
}




function mapStateToProps(state) {
    return {
	post:state.posts,
	postForm:state.postForm,	
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
