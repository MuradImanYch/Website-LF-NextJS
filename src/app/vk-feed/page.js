import VKPosts from '@/components/Main/VKPosts/VKPosts';
import './style.css';

export const metadata = {
    title: 'Лента новостей ВКонтакте - футбольные обновления',
    description: 'Следите за футбольными новостями и обновлениями через ленту ВКонтакте.',
    keywords: 'ВКонтакте новости, футбольные обновления, лента ВК',
    openGraph: {
      type: 'website',
      title: 'Лента новостей ВКонтакте - футбольные обновления',
      description: 'Следите за футбольными новостями и обновлениями через ленту ВКонтакте.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Лента новостей ВКонтакте - футбольные обновления',
      description: 'Следите за футбольными новостями и обновлениями через ленту ВКонтакте.'
    }
  };

const page = () => {
    return (
        <div className='vk-feed-page'>
            <VKPosts placement={'page'} />
        </div>
    );
};

export default page;