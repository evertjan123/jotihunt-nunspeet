import { FC, useEffect, useState } from "react";
import { getArticles } from "../../API";
import { Article } from "../../types";
import { ArticleBlock } from "../ArticleBlock/ArticleBlock";

export const ArticleList: FC = () => {
  const [articles, setArticles] = useState<Article[] | []>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await getArticles();
    setArticles(result);
  };
  return (
    <div className="flex flex-col">
      {articles.map((article) => {
        return <ArticleBlock article={article} />;
      })}
    </div>
  );
};
