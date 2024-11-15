export const metadata = {
    title: 'Page not found',
    description: 'The page on the site does not exist.',
    keywords: 'lf page not found',
    openGraph: {
      type: 'website',
      title: 'Page not found',
      description: 'The page on the site does not exist.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Page not found',
      description: 'The page on the site does not exist.'
    }
  };

const notFound = () => {
    return (
        <div style={{background: 'url(/assets/img/not-found.webp)', height: "100vh", backgroundPosition: "center"}}></div>
    );
};

export default notFound;