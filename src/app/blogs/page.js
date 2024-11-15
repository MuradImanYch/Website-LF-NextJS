import NewsPage from "@/components/News/NewsPage/NewsPage";

export const metadata = {
    title: 'Блоги о футболе - мнения и аналитика',
    description: 'Читайте блоги о футболе, личные мнения экспертов и фанатов, а также аналитические материалы.',
    keywords: 'футбольные блоги, мнения о футболе, аналитика футбола',
    openGraph: {
      type: 'website',
      title: 'Блоги о футболе - мнения и аналитика',
      description: 'Читайте блоги о футболе, личные мнения экспертов и фанатов, а также аналитические материалы.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Блоги о футболе - мнения и аналитика',
      description: 'Читайте блоги о футболе, личные мнения экспертов и фанатов, а также аналитические материалы.'
    }
};

const page = async () => {
    return (
        <NewsPage placement={'blogs'} />
    );
};

export default page;