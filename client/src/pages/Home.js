import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import '../App.css';

function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data: { getPosts: posts } = {}} = useQuery(FETCH_POSTS_QUERY);

   
    return(
        <Container>
            <Row>
                <h1 className='page-title'>Recent Posts</h1>
            </Row>
            <Row>
                {
                    user && (
                        <Col xs={6} md={4}>
                            <PostForm/>
                        </Col>
                    )
                }
                {
                    loading ? (
                        <h1>Loading posts...</h1>
                    ) : (
                        posts && posts.map(post => (
                            <Col xs={6} md={4} key={post.id} style={{marginBottom: 20}}>
                                <PostCard post={post}/>
                            </Col>
                        ))
                    )
                }   
            </Row>

    </Container>
    );
}

export default Home;