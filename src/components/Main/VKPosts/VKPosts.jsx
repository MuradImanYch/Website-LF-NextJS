import Link from 'next/link';
import './VKPosts.css';
import Image from 'next/image';
import DateComponent from '@/components/News/Date/DateComponent';
import translate from '@/libs/translate';

const VKPosts = async ({placement, lang}) => {
    async function fetchVKGroupPosts() {
        try {
            const res = await fetch(`https://api.vk.com/method/wall.get?domain=leg.football&access_token=${process.env.VK_API}&v=5.199`, {cache: 'no-cache'});
            const data = await res.json();
          
            return data;
        } 
        catch (err) {
            console.error(err);
        }
    }

    const data = await fetchVKGroupPosts();
    const filter = await data.response?.items.filter(e => {
        return e.attachments[0]?.type === 'photo';
    });
  
    return (
        <section className='vkPosts'>
            {placement === 'main' && <div className="head">
                <h2 className="name"><Link href={`${lang === 'en' ? 'en' : ''}/vk-feed`}>{lang === 'en' ? "VK Feed" : "Лента ВК"}</Link></h2>
            </div>}
            <div className="wrap">
                {placement === 'main' ? filter.slice(0, 4).map(async e => {

                    return <article key={e.id}>
                                <span className='date'><DateComponent dateProps={e.date * 1000} /></span>
                                <Image alt={(lang === 'en' ? await translate(e.text, {to: 'en'}) : await translate(e.text, {to: 'ru'})).split('\n')[0]} title={(lang === 'en' ? await translate(e.text, {to: 'en'}) : await translate(e.text, {to: 'ru'})).split(' ').slice(0, 12).toString().replaceAll(',', ' ').replaceAll('\n', ' ')} placeholder='empty' width={'200'} height={'50'} src={e.attachments[0].photo.orig_photo.url} />
                                <h4><Link target='__blanlk' href={`https://vk.com/leg.football?w=wall${e.owner_id}_${e.id}`}>{lang === 'en' ? await translate(e.text.split(' ').slice(0, 40).join(' '), {to: 'en'}) : await translate(e.text.split(' ').slice(0, 40).join(' '), {to: 'ru'})} {e.text.split(' ').length > 40 && '...'}</Link></h4>
                            </article>
                }) : filter.map(async e => {

                    return <article key={e.id}>
                                <span className='date'><DateComponent dateProps={e.date * 1000} /></span>
                                <Image alt={(lang === 'en' ? await translate(e.text, {to: 'en'}) : await translate(e.text, {to: 'ru'})).split('\n')[0]} title={(lang === 'en' ? await translate(e.text, {to: 'en'}) : await translate(e.text, {to: 'ru'})).split(' ').slice(0, 12).toString().replaceAll(',', ' ').replaceAll('\n', ' ')} placeholder='empty' width={'200'} height={'50'} src={e.attachments[0].photo.orig_photo.url} />
                                <h4><Link target='__blanlk' href={`https://vk.com/leg.football?w=wall${e.owner_id}_${e.id}`}>{lang === 'en' ? await translate(e.text.split(' ').slice(0, 40).join(' '), {to: 'en'}) : await translate(e.text.split(' ').slice(0, 40).join(' '), {to: 'ru'})} {e.text.split(' ').length > 40 && '...'}</Link></h4>
                            </article>
                })}
            </div>
            {placement === 'page' && <Link target='_blank' className='link' href={'https://vk.com/leg.football'}>{lang === 'en' ? "All VK Legendary Football feed" : 'Вся лента VK Legendary Football'}</Link>}
        </section>
    );
};

export default VKPosts;