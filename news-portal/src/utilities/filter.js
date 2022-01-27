export default function filterNewsSource(newsList, filteredNewsList) {
    return newsList.filter((news) => {
        return filteredNewsList.includes(news.source.name);
    });
}