import { FC } from "react";
import { Article } from "../../types";

interface IArticleBlockProps {
  article: Article;
}

export const ArticleBlock: FC<IArticleBlockProps> = (
  props: IArticleBlockProps
) => {
  return (
    <>
      <div>Test</div>
    </>
  );
};
