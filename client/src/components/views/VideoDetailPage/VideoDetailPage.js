import React,{ useState, useEffect } from 'react';
import { Row, Col,List,Avatar } from 'antd';
import axios from 'axios';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const videoVariable = {
        videoId: videoId
    }
    const [Video,setVideo] = useState([])

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, [])

    return (
        <Row>
            <Col lg={18} xs={24}>
                <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                    <List.Item
                        actions
                    >
                        <List.Item.Meta
                            avatar
                            title
                            description
                        />
                        <div></div>
                    </List.Item>

                </div>
            </Col>
            <Col lg={6} xs={24}>


            </Col>
        </Row>
    )
    
}

export default VideoDetailPage
