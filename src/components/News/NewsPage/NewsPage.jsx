import Image from "next/image";
import './NewsPage.css';
import Link from "next/link";
import config from '../../../../public/conf.json';
import Pagination from "@/components/News/Pagination/Pagination";
import DateComponent from "../Date/DateComponent";
// import translate from "@/libs/translate";

const league = config.tournaments.map(tournament => tournament.leagues.find(league => league.id === config.actualLeagueIds[0] && league.type !== 'National')).find(league => league !== undefined);

let countryName;

for (const country of config.tournaments) {
    const league = country.leagues.find(league => league.id === config.actualLeagueIds[0]);
    if (league) {
        countryName = country;
    }
}

const countryPathname = countryName.name.en.replace(/\s+/g, '-').toLowerCase();
const leaguePathname = league.name.en.replaceAll('.', '').replaceAll('-', '').replaceAll(/\s+/g, '-').toLowerCase().replaceAll('ü', 'u').replaceAll('ə', 'a').replaceAll('ö', 'o').replaceAll('ğ', 'gh').replaceAll('ı', 'i').replaceAll('ç', 'c').replaceAll('ç', 'c').replaceAll('ã', 'a').replaceAll('ş', 's').replaceAll('ó', 'o').replaceAll('ú', 'u').replaceAll('é', 'e').replaceAll('ý', 'y').replaceAll('ï', 'i').replaceAll('á', 'a').replaceAll('ø', 'o').replaceAll('í', 'i').replaceAll('/', '-').replaceAll('\'', '').replaceAll('--', '');

async function fetchActualNews() {
    try {
      const res = await fetch(`${config.domain}/api/news?limit=30&category=${league.category}&tags=${league.category}`, {cache: 'no-cache'});
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
}

const NewsPage = async ({placement, params, param, pagPathName, generatedTags, lang}) => {
    const pageNum = placement !== 'tags-search' ? params ? params.page : 1 : params.page ? params.page : 1;
    const tags = param?.tags ? encodeURIComponent(param.tags) : '';

    async function fetchNews() {
        try {
          const res = await fetch(`${placement === 'news' && `${config.domain}/api/news?limit=30&page=${pageNum}` || placement === 'transfer-news' && `${config.domain}/api/news?limit=30&category=трансфер, переход, transfer&tags=трансфер, переход, transfer&page=${pageNum}` || placement === 'offtop-news' && `${config.domain}/api/news?limit=30&category=offtop, other, оффтоп, разное, другие&tags=offtop, other, оффтоп, разное, другие&page=${pageNum}` || placement === 'blogs' && `${config.domain}/api/news?limit=30&category=blog, блог, статья, статьи, авторский, авторская&tags=blog, блог, статья, статьи, авторский, авторская&page=${pageNum}` || placement === 'video' && `${config.domain}/api/news?limit=30&category=video, видео&tags=video, видео&page=${pageNum}` || placement === 'tournament-news' && `${config.domain}/api/news?limit=30&category=${tags}&tags=${tags}&page=${pageNum}` || placement === 'tags-search' && `${config.domain}/api/news?limit=30&${lang === 'en' ? 'categoryEn' : 'category'}=${params.tag}&${lang === 'en' ? 'tagsEn' : 'tags'}=${params.tag}&page=${pageNum}` || placement === 'news-single-page' && `${config.domain}/api/news?limit=10&${lang === 'en' ? 'categoryEn' : 'category'}=${generatedTags}&${lang === 'en' ? 'tagsEn' : 'tags'}=${generatedTags}`}`, {cache: 'no-cache'});
          return await res.json();
        } catch (err) {
          console.error(err);
          return [];
        }
    }

    const news = await fetchNews();
    const actualNews = await fetchActualNews();

    return (
        <div className="allNews">
            <div className="wrap">
                <div className="newsWrap">
                    {placement === 'news-single-page' && <h3 className="similar-news">{lang === 'en'? 'Related News' : 'Похожие новости'}</h3>}
                    {news && news.map(async e => {
                        return <article key={e.id}>
                            <Link href={lang === 'en' ? `/en/news/read/${e.urlEn}` : `/news/read/${e.url}`}>
                                <div className="image">
                                    <Image alt={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} title={(lang === 'en' ? e.titleEn : e.title)?.split(' ').slice(0, 5).toString().replaceAll(',', ' ')} width={'150'} height={'70'} src={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('http') ? e.img : `${config.domain}/assets/news/${e.img}` : ''} placeholder={'empty'} />
                                </div>
                                <div className="text">
                                    <div className="date-tag">
                                        <span className="date"><DateComponent dateProps={e.date} /></span>
                                        <Link href={lang === 'en' ? `/en/search/${e.categoryEn}` : `/search/${e.category}`} className="tag">{`#${lang === 'en' ? e.categoryEn : e.category}`}</Link>
                                    </div>
                                    <h2><Link href={lang === 'en' ? `/en/news/read/${e.urlEn}` : `/news/read/${e.url}`}>{lang === 'en' ? e.titleEn : e.title}</Link></h2>
                                    <p className="description">{lang === 'en' ? e.meta_descriptionEn : e.meta_description}</p>
                                </div>
                            </Link>
                        </article>
                    })}

                    <Pagination pagPathName={pagPathName} placement={placement} currentPage={pageNum} tags={tags} params={params} lang={lang} />
                </div>
                <div className="actual-news">
                    <div className="head">
                        <h3 className="name"><Link href={`#`}>{lang === 'en' ? 'Trending Today' : 'Актуально сегодня'}</Link></h3>
                    </div>
                    <div className="actual-news-wrap">
                        {actualNews && actualNews.map(async e => {
                            return <article key={'actual-news' + e.id}>
                                <h4><span className="date"><DateComponent dateProps={e.date} /></span><Link href={lang === 'en' ? `/en/news/read/${e.urlEn}` : `/news/read/${e.url}`}>{lang === 'en' ? e.titleEn : e.title}</Link></h4>
                            </article>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;