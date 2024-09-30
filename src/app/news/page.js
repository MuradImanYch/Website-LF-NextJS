import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Свежие новости АПЛ, РПЛ, Ла Лиги, Серии А, Лиги Чемпионов и других турнир',
    description: 'Будьте в курсе всех новостей ведущих турниров европы и постсоветского пространства.',
    keywords: 'новости апл, новости рпл, новости ла лиги, новости серии а, новости лч, все новости футбола, результаты матчей, трансферные слухи, актуальные трансферы, свежие новости футбола'
};

const page = async () => {
    return (
        <NewsPage placement={'news'} />
    );
};

export default page;