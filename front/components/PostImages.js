
import React ,{useCallback,useState}from 'react'; 
import PropTypes from 'prop-types'
import ImagesZoom from './ImagesZoom'; 


const PostImges = ({images})=>{

    const [showImageZoom,setShowImageZoom] = useState(false); 
    const onZoom =useCallback(() =>{
        setShowImageZoom(true);

    },[showImageZoom]); 

    const onClose = useCallback(()=>{
        setShowImageZoom(false);
    },[showImageZoom])

    if(images.length ===1){
        return (
            <div>
                <img src={`http://captainryan.gonetis.com:3065/${images[0].src}`} onClick={onZoom}/>
                {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
            </div>
            );
    };

    if(images.length ===2){
        return (
            <div>
                <div>
                    <img src={`http://captainryan.gonetis.com:3065/${images[0].src}`}  width="50%"  onClick={onZoom}/>
                    <img src={`http://captainryan.gonetis.com:3065/${images[1].src}`}  width="50%"  onClick={onZoom}/>
                </div>
                {showImageZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </div>
        );
    };


        return (
            <div> 
                <div>
                    <img src={`http://captainryan.gonetis.com:3065/${images[0].src}`}  width="50%"  onClick={onZoom}/>
                    <div style={{display:'inline-block', width:'50%', textAlign:'center', verticalAlign:'middle'}} onClick={onZoom}>
                    +
                    <br />
                    {images.length-1}
                    개 사진 더 보기
                    </div>
                </div>
                {showImageZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </div>
        )
}

PostImges.propTypes = {
    images : PropTypes.arrayOf(PropTypes.shape({
        src : PropTypes.string,
    })).isRequired,
}; 

export default PostImges;