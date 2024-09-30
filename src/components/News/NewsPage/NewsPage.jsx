import Image from "next/image";
import './NewsPage.css';
import Link from "next/link";
import config from '../../../../public/conf.json';
import Pagination from "@/components/News/Pagination/Pagination";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import DateComponent from "../Date/DateComponent";

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
      const res = await fetch(`http://78.46.254.73:3000/api/news?limit=30&category=${league.category}&tags=${league.category}`, {cache: 'no-cache'});
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
}

const NewsPage = async ({placement, params, param, pagPathName, generatedTags}) => {
    const pageNum = placement !== 'tags-search' ? params ? params.page : 1 : params.page ? params.page : 1;
    const tags = param?.tags ? encodeURIComponent(param.tags) : '';

    async function fetchNews() {
        try {
          const res = await fetch(`${placement === 'news' && `http://78.46.254.73:3000/api/news?limit=30&page=${pageNum}` || placement === 'transfer-news' && `http://78.46.254.73:3000/api/news?limit=30&category=трансфер, переход, transfer&tags=трансфер, переход, transfer&page=${pageNum}` || placement === 'offtop-news' && `http://78.46.254.73:3000/api/news?limit=30&category=offtop, other, оффтоп, разное, другие&tags=offtop, other, оффтоп, разное, другие&page=${pageNum}` || placement === 'blogs' && `http://78.46.254.73:3000/api/news?limit=30&category=blog, блог, статья, статьи, авторский, авторская&tags=blog, блог, статья, статьи, авторский, авторская&page=${pageNum}` || placement === 'video' && `http://78.46.254.73:3000/api/news?limit=30&category=video, видео&tags=video, видео&page=${pageNum}` || placement === 'tournament-news' && `http://78.46.254.73:3000/api/news?limit=30&category=${tags}&tags=${tags}&page=${pageNum}` || placement === 'tags-search' && `http://78.46.254.73:3000/api/news?limit=30&category=${params.tag}&tags=${params.tag}&page=${pageNum}` || placement === 'news-single-page' && `http://78.46.254.73:3000/api/news?limit=10&category=${generatedTags}&tags=${generatedTags}`}`, {cache: 'no-cache'});
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
                    {placement === 'news-single-page' && <h3 className="similar-news">Похожие новости</h3>}
                    {news && news.map(e => {
                        return <article key={e.id}>
                            <Link href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '').replaceAll('/', '-')}`}>
                                <div className="image">
                                    <Image alt={e.title.split(' ').slice(0, 5).toString().replace(',', ' ')} title={e.title.split(' ').slice(0, 5).toString().replace(',', ' ')} width={'150'} height={'70'} src={e.img !== "undefined" && e.img !== 'fotos/bb/42/e243d59e6e78c095477f3bbeb2e3fe65662aa5e971d88797595920.jpg' ? e.img.includes('/public/static/uploads/') ? 'https://legfootball.com' + e.img : e.img : ''} placeholder={'empty'} />
                                </div>
                                <div className="text">
                                    <div className="date-tag">
                                        <span className="date"><DateComponent dateProps={e.date} /></span>
                                        <Link href={'/tags/search/' + e.category} className="tag">{`#${e.category}`}</Link>
                                    </div>
                                    <h2><Link href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '').replaceAll('/', '-')}`}>{e.title}</Link></h2>
                                    <p className="description">{e.meta_description}</p>
                                </div>
                            </Link>
                        </article>
                    })}

                    <Pagination pagPathName={pagPathName} placement={placement} currentPage={pageNum} tags={tags} params={params} />
                </div>
                <div className="actual-news">
                    <div className="head">
                        <h3 className="name"><Link href={`#`}>Актуально сегодня</Link></h3>
                    </div>
                    <div className="actual-news-wrap">
                        {actualNews && actualNews.map(e => {
                            return <article key={'actual-news' + e.id}>
                                <h4><span className="date"><DateComponent dateProps={e.date} /></span><Link href={`/news/read/${e.id + '-' + cyrillicToTranslit().transform(e.title).replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase().replace(/-+$/, '').replaceAll('/', '-')}`}>{e.title}</Link></h4>
                            </article>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;