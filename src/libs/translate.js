const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
const apiKey = process.env.TRANSLATE_API_KEY;

const translate = async (text, { from = 'ru', to = 'en' } = {}) => {
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: text,
      source: from, // Исходный язык
      target: to    // Целевой язык
    })
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data.translations.translatedText; // Получаем переведённый текст
  } catch (error) {
    console.error('Ошибка перевода:', error);
    return text; // Возвращаем оригинальный текст в случае ошибки
  }
};

export default translate;