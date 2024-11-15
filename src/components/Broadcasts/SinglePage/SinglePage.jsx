import Image from 'next/image';
import './SinglePage.css';
import Client from '../Client/Client';
import { notFound } from 'next/navigation';
// import cyrillicToTranslit from 'cyrillic-to-translit-js';
import translate from '@/libs/translate';
import config from '../../../../public/conf.json';

const SinglePage = async ({url, lang}) => {
    async function fetchBroadcast() {
        try {
          const res = await fetch(`${config.domain}/api/broadcasts?url=${url}`, {cache: 'no-cache'});
          return await res.json();
        } catch (err) {
          console.error(err);
          return [];
        }
    }
    
    const broadcast = await fetchBroadcast();

    if(broadcast.length < 1 || url !== broadcast[0].url) {
      notFound();
    }

    return (
        <div className="single-page">
            <h1>{broadcast[0].status !== 'finished' ? lang === 'en' ? 'Live stream' : 'Трансляция матча' : lang === 'en' ? 'Match replay' : 'Повтор матча'}: <Image title={lang === 'en' ? broadcast[0].hName : config['correct-translate-ru'][await translate(broadcast[0].hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(broadcast[0].hName, {from: 'en', to: 'ru'})] : await translate(broadcast[0].hName, {from: 'en', to: 'ru'})} alt={`${lang === 'en' ? broadcast[0].hName : config['correct-translate-ru'][await translate(broadcast[0].hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(broadcast[0].hName, {from: 'en', to: 'ru'})] : await translate(broadcast[0].hName, {from: 'en', to: 'ru'})} лого`} placeholder="empty" src={broadcast[0].hLogo} width={25} height={25} /> {lang === 'en' ? broadcast[0].hName : config['correct-translate-ru'][await translate(broadcast[0].hName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(broadcast[0].hName, {from: 'en', to: 'ru'})] : await translate(broadcast[0].hName, {from: 'en', to: 'ru'})} - {lang === 'en' ? broadcast[0].aName : config['correct-translate-ru'][await translate(broadcast[0].aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(broadcast[0].aName, {from: 'en', to: 'ru'})] : await translate(broadcast[0].aName, {from: 'en', to: 'ru'})} <Image title={lang === 'en' ? broadcast[0].aName : config['correct-translate-ru'][await translate(broadcast[0].aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(broadcast[0].aName, {from: 'en', to: 'ru'})] : await translate(broadcast[0].aName, {from: 'en', to: 'ru'})} alt={`${lang === 'en' ? broadcast[0].aName : config['correct-translate-ru'][await translate(broadcast[0].aName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(broadcast[0].aName, {from: 'en', to: 'ru'})] : await translate(broadcast[0].aName, {from: 'en', to: 'ru'})} лого`} placeholder="empty" src={broadcast[0].aLogo} width={25} height={25} /> | {lang === 'en' ? broadcast[0].lName : config['correct-translate-ru'][await translate(broadcast[0].lName, {from: 'en', to: 'ru'})] ? config['correct-translate-ru'][await translate(broadcast[0].lName, {from: 'en', to: 'ru'})] : await translate(broadcast[0].lName, {from: 'en', to: 'ru'})}</h1>
            <span className='status-text'>{broadcast[0].status === 'live' ? <span style={{ color: 'red', letterSpacing: '1.3px'}}>[{lang === 'en' ? 'Live' : 'Прямой эфир'}]</span> : null || broadcast[0].status === 'scheduled' ? <span style={{ color: 'gray', letterSpacing: '1.3px'}}>[{lang === 'en' ? `The broadcast hasn't started yet` : 'Трансляция пока не началась'}]</span> : null || broadcast[0].status === 'finished' ? <span style={{ color: '#000', letterSpacing: '1.3px'}}>[{lang === 'en' ? 'Finished' : 'Завершён'}]</span> : null}</span>

            <Client lang={lang} broadcast={broadcast} />
        </div>
    );
};

export default SinglePage;