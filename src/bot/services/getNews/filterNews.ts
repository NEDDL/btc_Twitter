import config from "../../../config";
const { topicRelevance, focusKeyword, forbiddenKeywords } = config.newsApi;

const filterNews = async (articles: any): Promise<any[]> => {
  try {
    const filteredNews: any[] = [];

    // Relevance of the article should be over 100
    const relevantNews = await articles.filter(
      (article: any) => article.relevance > topicRelevance
    );

    // Check if the article body includes bitcoin keyword more than 2 times.
    relevantNews.forEach((article: any) => {
      const body = article.body;
      const splitRegex = /,|\n\n|\.| /;

      const btcObject = body
        .split(splitRegex)
        .filter((word: any) => word.toLowerCase() === focusKeyword);

      // Check if the title includes forbidden keywords.
      let titleIsForbidden: boolean = false;
      forbiddenKeywords.forEach((keyword: any) => {
        if (article.title.toLowerCase().includes(keyword))
          titleIsForbidden = true;
      });

      // Map the article and push to the filteredNews array...
      // ...if bitcoin keyword is more than 2 times.
      const simplifiedArticle = {
        _id: article.uri,
        dateTimePub: article.dateTimePub,
        sentiment: article.sentiment,
        url: article.url,
        title: article.title,
        image: article.image,
        relevance: article.relevance,
        isPublished: false
      };

      if (btcObject.length > 2 && titleIsForbidden === false) {
        filteredNews.push(simplifiedArticle);
      }
    });
    return filteredNews;
  } catch (err: any) {
    throw Error(`Error while filtering the news: ${err.message}`);
  }
};

export default filterNews;
