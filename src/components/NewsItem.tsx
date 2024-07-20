
import React, { FC } from 'react'
// import { AppDispatch, RootState } from '../redux/store';
// import { useDispatch, useSelector } from 'react-redux';
import { INewsItem, 
    // likeNewsItem, unlikeNewsItem
 } from '../redux/newsSlice';

interface NewsItemProps {
    newsItem: INewsItem;

}

const NewsItem: FC<NewsItemProps> = ({
    newsItem: {
        // id,
        regionName, sectionName, title,date,titleImageWide, content,likes,
        //  isUserLikes 
         }}) => {


    // const dispatch: AppDispatch = useDispatch();

    // const userId = useSelector((state: RootState) => state.user.id);
    // 


    // const handleLike = async () => {
    //     if (userId) {
    //       if (isUserLikes) {
    //         dispatch(unlikeNewsItem({ newsId: id, userId }));
    //         try {
    //           await fetch('.....unlike', {
    //             method: 'DELETE',
    //             headers: {
    //               'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ newsId: id, userId })
    //           });
    //         } catch (error) {
    //           console.error('Failed to send unlike to backend', error);
    //         }
    //       } else {
    //         dispatch(likeNewsItem({ newsId: id, userId }));
    //         try {
    //           await fetch('...../like', {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ newsId: id, userId })
    //           });
    //         } catch (error) {
    //           console.error('Failed to send like to backend', error);
    //         }
    //       }
    //     } else {
    //       alert('Please log in to like this news.');
    //     }
    //   };


    return (
        <div className="news-item">
            <img src={titleImageWide} alt={title} />
            <h2>{title}</h2>
            <div className="like-section">
                {/* <button onClick={handleLike}>Like</button> */}
                <span>{likes} likes</span>
            </div>
            <p><strong>{regionName} - {sectionName}</strong></p>
            <p>{new Date(date).toLocaleDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: content }} />
           

        </div>
    );
};

export default NewsItem;