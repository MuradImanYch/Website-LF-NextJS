import Link from 'next/link';
import './Pagination.css';
import config from '../../../../public/conf.json';

const Pagination = async ({currentPage, placement, tags, pagPathName, params, lang}) => {
    async function fetchNews() {
        try {
          const res = await fetch(`${placement === 'transfer-news' && `${config.domain}/api/news?category=трансфер, переход, transfer&tags=трансфер, переход, transfer` || placement === 'news' && `${config.domain}/api/news` || placement === 'offtop-news' && `${config.domain}/api/news?category=offtop, other, оффтоп, разное, другие&tags=offtop, other, оффтоп, разное, другие` || placement === 'blogs' && `${config.domain}/api/news?category=blog, блог, статья, статьи, авторский, авторская&tags=blog, блог, статья, статьи, авторский, авторская` || placement === 'video' && `${config.domain}/api/news?category=video, видео&tags=video, видео` || placement === 'tournament-news' && `${config.domain}/api/news?category=${tags}&tags=${tags}` || placement === 'tags-search' && `${config.domain}/api/news?category=${params.tag}&tags=${params.tag}`}`, {cache: 'no-cache'});
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
            pagItems.push(placement === 'news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/news/page/${i}` : `/news/page/${i}`}>{i}</Link> || placement === 'transfer-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/transfer-news/page/${i}` : `/transfer-news/page/${i}`}>{i}</Link> || placement === 'offtop-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/offtop-news/page/${i}` : `/offtop-news/page/${i}`}>{i}</Link> || placement === 'blogs' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/blogs/page/${i}` : `/blogs/page/${i}`}>{i}</Link> || placement === 'video' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/video/page/${i}` : `/video/page/${i}`}>{i}</Link> || placement === 'tournament-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/tournament${pagPathName}news/page/${i}` : `/tournament${pagPathName}news/page/${i}`}>{i}</Link> || placement === 'tags-search' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/search/${params.tag}/page/${i}` : `/search/${params.tag}/page/${i}`}>{i}</Link>);
        }
    }

    for(let i = currentPage; i <= +currentPage + 2; i++) {
        if(i <= pagCount) {
            pagItems.push(placement === 'news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/news/page/${i}` : `/news/page/${i}`}>{i}</Link> || placement === 'transfer-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/transfer-news/page/${i}` : `/transfer-news/page/${i}`}>{i}</Link> || placement === 'offtop-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/offtop-news/page/${i}` : `/offtop-news/page/${i}`}>{i}</Link> || placement === 'blogs' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/blogs/page/${i}` : `/blogs/page/${i}`}>{i}</Link> || placement === 'video' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/video/page/${i}` : `/video/page/${i}`}>{i}</Link> || placement === 'tournament-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/tournament${pagPathName}news/page/${i}` : `/tournament${pagPathName}news/page/${i}`}>{i}</Link> || placement === 'tags-search' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/search/${params.tag}/page/${i}` : `/search/${params.tag}/page/${i}`}>{i}</Link>);
        }
    }

    if(currentPage <= pagCount - 5) {
        pagItems.push('...');
        for(let i = pagCount - 1; i <= pagCount; i++) {
            if(i <= pagCount) {
                pagItems.push(placement === 'news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/news/page/${i}` : `/news/page/${i}`}>{i}</Link> || placement === 'transfer-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/transfer-news/page/${i}` : `/transfer-news/page/${i}`}>{i}</Link> || placement === 'offtop-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/offtop-news/page/${i}` : `/offtop-news/page/${i}`}>{i}</Link> || placement === 'blogs' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/blogs/page/${i}` : `/blogs/page/${i}`}>{i}</Link> || placement === 'video' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/video/page/${i}` : `/video/page/${i}`}>{i}</Link> || placement === 'tournament-news' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/tournament${pagPathName}news/page/${i}` : `/tournament${pagPathName}news/page/${i}`}>{i}</Link> || placement === 'tags-search' && <Link className={i === currentPage && 'current'} href={lang === 'en' ? `/en/search/${params.tag}/page/${i}` : `/search/${params.tag}/page/${i}`}>{i}</Link>);
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