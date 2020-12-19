import React,{ useState, useEffect } from 'react';
import { Row, Col,List,Avatar } from 'antd';
import axios from 'axios';
import SideVideo from './Section/SideVideo'
import Subscribe from './Section/Subscribe'
import Comment from './Section/Comment'
import LikeDislikes from './Section/LikeDislikes'

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const videoVariable = {
        videoId: videoId
    }
    const [Video, setVideo] = useState([])
     const [CommentLists, setCommentLists] = useState([])
    
    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })
        axios.post('/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                    console.log('response.data.comments',response.data.comments)
                } else {
                    alert('댓글을 가져오는데 실패했습니다.')
                }
            })
    }, [])

    const refreshFunction = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    if (Video.writer) {
        
        const subscribeButton = localStorage.getItem('userId') !=null  && Video.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={Video.writer._id} userFrom={localStorage.getItem('userId')} />

        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                        <List.Item
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={ Video.title }
                                description={Video.description} 
                            />
                            <div></div>
                            <LikeDislikes Video videoId={videoId} userId={ localStorage.getItem('userId') }/>
                        </List.Item>
                        <Comment refreshFunction={refreshFunction} CommentLists={CommentLists} postId={Video._id} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    }else{
        return (
            <div>...Loading...</div>
        )
    }

    
}

export default VideoDetailPage
