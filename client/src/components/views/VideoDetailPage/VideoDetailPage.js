import { React, useState, useEffect } from 'react';
import { Row, Col,List,Avatar } from 'antd';
import axios from 'axios';

function VideoDetailPage(props) {

    const videoId = props.match.videoId
    const variable = { videoId:videoId }

    const [videoDetail,setvideoDetail] = useState([])

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
            .then(response =>{
                if(response.data.success){
                    setvideoDetail(response.data.videoDetail)
                    console.log(response.data)
                }else{
                    alert("비디오 정보를 가져오지 못했습니다.")
                    console.log(response.data)
                }
            })
    }, [])

    return (
        <Row>
            <Col lg={18} xs={24}>
                <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                    <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls></video>

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
