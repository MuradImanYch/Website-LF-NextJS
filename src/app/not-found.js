export const metadata = {
    title: 'Страница не найдена',
    description: 'Страница на сайте не существует.',
    keywords: 'не найдена страница lf',
    openGraph: {
      type: 'website',
      title: 'Страница не найдена',
      description: 'Страница на сайте не существует.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Страница не найдена',
      description: 'Страница на сайте не существует.'
    }
  };

const notFound = () => {
    return (
        <div style={{background: 'url(/assets/img/not-found.webp)', height: "100vh", backgroundPosition: "center"}}></div>
    );
};

export default notFound;