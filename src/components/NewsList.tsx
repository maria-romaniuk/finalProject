// import React, { FC } from 'react'
import NewsItem from './NewsItem';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setNews } from '../redux/newsSlice';
import { newsData } from './data/postman';
import NewsDetail from './NewsDetails';
import NewsDetails from './NewsDetails';

const NewsList = () => {
    
    const dispatch: AppDispatch = useDispatch();
    const news = useSelector((state: RootState) => state.news.items);
    const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
    useEffect(() => {
        // Используйте данные из файла `data.ts`
        dispatch(setNews(newsData));
    }, [dispatch]);

    // Фильтрация новостей по выбранному региону
    const filteredNews = selectedRegion
        ? news.filter(item => item.regionId === selectedRegion)
        : news;

    // Получение уникальных регионов для dropdown
    const regions = Array.from(new Set(news.map(item => item.regionId)))
        .map(id => ({
            id,
            name: news.find(item => item.regionId === id)?.regionName || 'Unknown'
        }));

    return (
        id ? (<NewsDetails />) : (
        <div className="news-list">
            <div className="news-dropdown dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Choose your region
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {regions.map(region => (
                        <a
                            key={region.id}
                            className="dropdown-item"
                            href="#"
                            onClick={() => setSelectedRegion(region.id)}
                        >
                            {region.name}
                        </a>
                    ))}
                </div>
            </div>
            {filteredNews.map((item) => (
                <NewsItem key={item.id} newsItem={item} />
            ))}
        </div>
    )
)
}

export default NewsList