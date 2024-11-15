import React from 'react';
import './Tags.css';
import Link from 'next/link';
// import translate from '@/libs/translate';
// import config from '../../../../public/conf.json';

const Tags = async ({news, placement, lang}) => {
    const reversedData = await news;

  const countTags = (articles) => {
    const tagCounts = {};
  
    articles && articles.forEach(article => {
      article?.tags.forEach(tag => {
        if (tagCounts[tag]) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
        }
      });
    });
  
    return tagCounts;
  };

  const tags = reversedData && reversedData.map(e => {
    if(lang === 'en') {
      if(e.tagsEn && e.tagsEn.length > 0) {
        return {tags: JSON.parse(e.tagsEn)};
      }
    }
    else {
      if(e.tags && e.tags.length > 0) {
        return {tags: JSON.parse(e.tags)};
      }
    }
  });

  const tagCounts = countTags(tags);
  delete tagCounts['футбол'];
  delete tagCounts['спорт'];
  delete tagCounts['football'];
  delete tagCounts['sport'];

    return (
        <section className='tags'>
            {placement === 'main' && <div className="head">
                <h2 className='name'><Link href={`${lang === 'en' ? 'en' : ''}/tags`}>{lang === 'en' ? 'Tags' : 'Теги'}</Link></h2>
            </div>}
            <div className="wrap">
                {placement === 'main' ? Object.entries(tagCounts).slice(0, 50).map(async ([tag, count]) => (
                    <span title={tag} key={tag} className="tag">
                        <Link style={{ fontSize: `${count / 20}em`, background: count > 40 ? 'rgba(252, 55, 55, 0.8)' : count > 30 ? 'rgba(255, 178, 11, 0.8)' : count > 20 ? 'rgba(247, 235, 17, 0.8)' : count > 10 ? 'rgba(204, 251, 15, 0.8)' : count > 5 ? 'rgba(31, 148, 221, 0.8)' : count > 0 ? 'rgba(31, 217, 221, 0.8)' : null}} href={lang === 'en' ? `/en/search/${tag}` : `/search/${tag}`}>#{tag} ({count})</Link>
                    </span>
                )) : Object.entries(tagCounts).map(async ([tag, count]) => (
                  <span title={tag} key={tag} className="tag">
                      <Link style={{ fontSize: `${count / 20}em`, background: count > 40 ? 'rgba(252, 55, 55, 0.8)' : count > 30 ? 'rgba(255, 178, 11, 0.8)' : count > 20 ? 'rgba(247, 235, 17, 0.8)' : count > 10 ? 'rgba(204, 251, 15, 0.8)' : count > 5 ? 'rgba(31, 148, 221, 0.8)' : count > 0 ? 'rgba(31, 217, 221, 0.8)' : null}} href={lang === 'en' ? `/en/search/${tag}` : `/search/${tag}`}>#{tag} ({count})</Link>
                  </span>
              ))}
            </div>
        </section>
    );
};

export default Tags;