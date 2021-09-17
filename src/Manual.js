import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Global.css'

export default function Manual() {
    const [data, setData] = useState(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(10);
    var temp = 10;


    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
         var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
         };
         const observer = new IntersectionObserver(handleObserver, options);
         if (loader.current) {
            observer.observe(loader.current)
         }
    }, []);


    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/photos")
          .then(response => {
              var material;
              {data ? material = data.concat(response.data.slice(x, y)) : material = response.data.slice(x, y)};
              setData(material);
          })
    }, [page]);
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {   
            setPage((page) => page + 1);
            setX((x) => x + temp + 1);
            setY((y) => y + temp + 1);
        }
    }

    return (
        <>
        <div className="wrapper">
            <h1 className="head_title">Infinite Scroll Example</h1>
            {data ? data.map(item => 
            <div key={item.id} className="card">
                <img src={item.url} className="image"/>
                <h4 className = "title">{item.id}. {item.title}</h4>
            </div>
            ) : null}
            <div className="loading" ref={loader}>
                    <h4>Loading</h4>
           </div>
        </div>
        </>
    )
}
