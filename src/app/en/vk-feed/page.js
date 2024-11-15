import VKPosts from '@/components/Main/VKPosts/VKPosts';
import '@/app/vk-feed/style.css';

export const metadata = {
    title: "VK News Feed - Football Updates",
    description: "Follow football news and updates through the VK news feed.",
    keywords: "VK news, football updates, VK feed",
    openGraph: {
      type: 'website',
      title: "VK News Feed - Football Updates",
      description: "Follow football news and updates through the VK news feed."
    },
    twitter: {
      card: 'summary_large_image',
      title: "VK News Feed - Football Updates",
      description: "Follow football news and updates through the VK news feed."
    }
  };

const page = () => {
    return (
        <div className='vk-feed-page'>
            <VKPosts placement={'page'} lang={'en'} />
        </div>
    );
};

export default page;