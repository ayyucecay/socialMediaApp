import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BsFillHeartFill } from "react-icons/bs";

import '../style/PostCard.css';

function LikeButton({ user, post: { id, likeCount, likes}}) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        } else setLiked(false)
    }, [user, likes]);
    
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    })

    const likeButton = user ? (
        liked ? (
            <Col className='col-6'>
                        <Button className='like-button-fill'>
                            <BsFillHeartFill/>
                        </Button>
                    </Col>
        ) : (
            <Col className='col-6'>
                        <Button className='like-button'>
                            <BsFillHeartFill/>
                        </Button>
                    </Col>
        )
    ) : (
        <Col className='col-6'>
                        <Button as={Link} to="/login" className='like-button-fill' basic>
                            <BsFillHeartFill/>
                        </Button>
                    </Col>
    )

    return(
        <Col className='col-5'> 
            <div className="button-like" onClick={likePost}>
                <Row style={{padding: "0px"}}>
                    {likeButton}
                    <Col className='col-6 like-p'>
                            {likeCount}
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;