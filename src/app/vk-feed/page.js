import VKPosts from '@/components/Main/VKPosts/VKPosts';
import './style.css';

const page = () => {
    return (
        <div className='vk-feed-page'>
            <VKPosts placement={'page'} />
        </div>
    );
};

export default page;