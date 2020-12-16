import React,{useEffect} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    useEffect(() => {
        
    }, [])

    const renderReplyComment = (parentCommentId) => {
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} postId={props.postId} />
                        <ReplyComment parentCommentId={comment._id} CommentLists={props.CommentLists} postId={props.postId} />
                    </div>
                }
            </React.Fragment>
        ))
    }

    return (
        <div>
            <p style={{fontSize:'14px',margin:'0',clolor:'gray'}} onClick >
                View 1 more comment(s)
            </p>
            {renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
