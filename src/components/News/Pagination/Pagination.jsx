import Link from 'next/link';
import './Pagination.css';

const Pagination = async ({currentPage, placement, tags, pagPathName, params}) => {
    async function fetchNews() {
        try {
          const res = await fetch(`${placement === 'transfer-news' && 'http://78.46.254.73:3000/api/news?category=трансфер, переход, transfer&tags=трансфер, переход, transfer' || placement === 'news' && 'http://78.46.254.73:3000/api/news' || placement === 'offtop-news' && 'http://78.46.254.73:3000/api/news?category=offtop, other, оффтоп, разное, другие&tags=offtop, other, оффтоп, разное, другие' || placement === 'blogs' && 'http://78.46.254.73:3000/api/news?category=blog, блог, статья, статьи, авторский, авторская&tags=blog, блог, статья, статьи, авторский, авторская' || placement === 'video' && 'http://78.46.254.73:3000/api/news?category=video, видео&tags=video, видео' || placement === 'tournament-news' && `http://78.46.254.73:3000/api/news?category=${tags}&tags=${tags}` || placement === 'tags-search' && `http://78.46.254.73:3000/api/news?category=${params.tag}&tags=${params.tag}`}`, {cache: 'no-cache'});
          return await res.json();
        } catch (err) {
          console.error(err);
          return [];
        }
    }

    const news = await fetchNews();
    const pagCount = Math.ceil(news.length / 30);
    const pagItems = [];

    for(let i = currentPage - 2; i <= +currentPage - 1; i++) {
        if(i >= 1) {
            pagItems.push(placement === 'news' && <Link className={i === currentPage && 'current'} href={'/news/page/' + i}>{i}</Link> || placement === 'transfer-news' && <Link className={i === currentPage && 'current'} href={'/transfer-news/page/' + i}>{i}</Link> || placement === 'offtop-news' && <Link className={i === currentPage && 'current'} href={'/offtop-news/page/' + i}>{i}</Link> || placement === 'blogs' && <Link className={i === currentPage && 'current'} href={'/blogs/page/' + i}>{i}</Link> || placement === 'video' && <Link className={i === currentPage && 'current'} href={'/video/page/' + i}>{i}</Link> || placement === 'tournament-news' && <Link className={i === currentPage && 'current'} href={`/tournament${pagPathName}/news/page/` + i}>{i}</Link> || placement === 'tags-search' && <Link className={i === currentPage && 'current'} href={`/tags/search/${params.tag}/page/` + i}>{i}</Link>);
        }
    }

    for(let i = currentPage; i <= +currentPage + 2; i++) {
        if(i <= pagCount) {
            pagItems.push(placement === 'news' && <Link className={i === currentPage && 'current'} href={'/news/page/' + i}>{i}</Link> || placement === 'transfer-news' && <Link className={i === currentPage && 'current'} href={'/transfer-news/page/' + i}>{i}</Link> || placement === 'offtop-news' && <Link className={i === currentPage && 'current'} href={'/offtop-news/page/' + i}>{i}</Link> || placement === 'blogs' && <Link className={i === currentPage && 'current'} href={'/blogs/page/' + i}>{i}</Link> || placement === 'video' && <Link className={i === currentPage && 'current'} href={'/video/page/' + i}>{i}</Link> || placement === 'tournament-news' && <Link className={i === currentPage && 'current'} href={`/tournament${pagPathName}/news/page/` + i}>{i}</Link> || placement === 'tags-search' && <Link className={i === currentPage && 'current'} href={`/tags/search/${params.tag}/page/` + i}>{i}</Link>);
        }
    }

    if(currentPage <= pagCount - 5) {
        pagItems.push('...');
        for(let i = pagCount - 1; i <= pagCount; i++) {
            if(i <= pagCount) {
                pagItems.push(placement === 'news' && <Link className={i === currentPage && 'current'} href={'/news/page/' + i}>{i}</Link> || placement === 'transfer-news' && <Link className={i === currentPage && 'current'} href={'/transfer-news/page/' + i}>{i}</Link> || placement === 'offtop-news' && <Link className={i === currentPage && 'current'} href={'/offtop-news/page/' + i}>{i}</Link> || placement === 'blogs' && <Link className={i === currentPage && 'current'} href={'/blogs/page/' + i}>{i}</Link> || placement === 'video' && <Link className={i === currentPage && 'current'} href={'/video/page/' + i}>{i}</Link> || placement === 'tournament-news' && <Link className={i === currentPage && 'current'} href={`/tournament${pagPathName}/news/page/` + i}>{i}</Link> || placement === 'tags-search' && <Link className={i === currentPage && 'current'} href={`/tags/search/${params.tag}/page/` + i}>{i}</Link>);
            }
        }
    }

    return (
        <div className='pagination'>
            {pagItems}
        </div>
    );
};

export default Pagination;