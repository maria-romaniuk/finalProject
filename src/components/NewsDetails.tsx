import React from 'react'

const NewsDetail = () => {
    const { id } = useParams() as { id: string };
    const navigate = useNavigate();

  return (
    <div className="news-detail">
    <img src={newsItem.titleImageWide} alt={newsItem.title} />
    <h1>{newsItem.title}</h1>
    <p><strong>Region:</strong> {newsItem.regionName}</p>
    <p><strong>Section:</strong> {newsItem.sectionName}</p>
    <p><strong>Date:</strong> {new Date(newsItem.date).toLocaleDateString()}</p>
    <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
    <p><strong>Likes:</strong> {newsItem.likes || 0}</p>
  </div>
  )
}

export default NewsDetail