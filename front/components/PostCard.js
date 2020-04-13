
import React  from 'react'
import {Card , Button, Avatar}from 'antd'
import {RetweetOutlined ,
        HeartOutlined ,
        EllipsisOutlined 
} from '@ant-design/icons';
import PropTypes from 'prop-types'

const PostCard = ({post}) =>{
    
    return (
        <Card
            key={+post.createdAt}
            cover={post.img && <img alt="example" src={post.img} style={{width:'100px'}}/>}
            actions={[
                <RetweetOutlined />,
                <HeartOutlined />,
                <EllipsisOutlined />,
            ]}
            extra={<Button>팔로우</Button>}
             >
            <Card.Meta 
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={post.content}
            />
        </Card>
    )
     
}

PostCard.propTypes = {
                    //shape을 써서 객체의 각 props의 상세 타입을 지정할 수 있다.
    post : PropTypes.shape({
            User: PropTypes.object,
            content : PropTypes.string,
            img:PropTypes.string,
            createdAt:PropTypes.object
    })
}

export default PostCard; 