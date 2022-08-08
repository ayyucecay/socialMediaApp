import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/react-hooks';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsFillChatDotsFill } from "react-icons/bs";

import moment from 'moment';

import { AuthContext } from '../context/auth';
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";

function SinglePost() {
    //get id from url
    const postId2 = useParams();
    const postId = postId2.postId;

    const [ comment, setComment ] = useState('');

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { data: { getPost } = {}} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });
    
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update(){
            setComment('');
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback() {
        navigate('/');
    }
    let postMarkup;
    if(!getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;

        postMarkup = (
            <Container style={{marginTop: "30px"}}>
                <Row>
                    <Col className='col-4'>
                        <Image
                            src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1824452bb61%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1824452bb61%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.1328125%22%20y%3D%2296.6%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        />
                    </Col>
                    <Col className='col-8'>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>{username}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{moment(createdAt).fromNow()}</Card.Subtitle>
                                </Col>
                            </Row>
                            <Card.Text>{body}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Row>
                                <LikeButton user={user} post={{ id, likes, likeCount }}/>
                                <Col className='col-5'>
                                    <div className="button-comment">
                                        <Row style={{padding: "0px"}}>
                                            <Col className='col-6'>
                                                <Button className='comment-button' onClick={() => console.log('comment on post')}>
                                                    <BsFillChatDotsFill/>
                                                </Button>
                                            </Col>
                                            <Col className='col-6 comment-p'>
                                                    {commentCount}
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>  
                                <Col className='col-2' style={{marginLeft: "-10px"}}>
                                    {user && user.username === username && (
                                        <DeleteButton postId={id} callback={deletePostCallback}/>
                                    )}
                                </Col>
                            </Row> 
                        </Card.Body>
                    </Card>
                    {user && 
                        <Card style={{marginTop: "20px"}}>
                            <Card.Body>
                                <p>Post a comment</p>
                                <Form >
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            placeholder='Comment..'
                                            name='comment'
                                            type='text'
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                        />
                                    </Form.Group>
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        disabled= {comment.trim()===''}
                                        onClick={submitComment}
                                        style={{float: 'right'}}
                                        >
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>}
                    {comments.map(comment => (
                        <Card key={comment.id} style={{marginTop: "20px"}}>
                            <Card.Body>
                                <Row>
                                    <Col className='col-10'>
                                        <Card.Title>{comment.username}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{moment(comment.createdAt).fromNow()}</Card.Subtitle>
                                    </Col>
                                    <Col className='col-2'>
                                        {user && user.username === comment.username && (
                                            <DeleteButton postId={id} commentId={comment.id} />
                                        )}
                                    </Col>
                                </Row>
                                <Card.Text>{comment.body}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    </Col>
                </Row>
            </Container>
        )
    }
    return postMarkup
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body:String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId:ID!) {
        getPost(postId:$postId){
            id
            body
            createdAt
            username
            comments{
                id
                username
                createdAt
                body
            }
            commentCount
            likeCount
            likes{
                username
            }
        }
    }
`

export default SinglePost;