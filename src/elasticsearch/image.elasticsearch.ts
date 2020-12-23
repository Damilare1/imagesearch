import { Client } from "@elastic/elasticsearch";
import { elasticClient } from "../../config/es.config";
import { getObj } from "../../helpers/cast.helper";

type ESDependencies = {
  ESClient: Client;
};
const indexName = "randomindex";

export const ESConfig = (dependencies: ESDependencies) => {
  const { ESClient } = dependencies;

  function createDocument(document) {
    return ESClient.index({
      index: indexName,
      type: "document",
      body: {
        description: document.description,
        url: document.url,
        name: document.name,
        type: document.type,
        size: document.size,
      },
    });
  }

  async function getSuggestions(input, size = 20, page=0) {
    try {
      const { body } = await ESClient.search({
        index: indexName,
        size,
        from: page,
        q: input,
      });

      /// had to force a type cast because it seems the interface hadn't been updated yet.
      const totalCount = getObj(body.hits.total).value;
      const totalPage = Math.floor(totalCount / size);
      return {
        totalCount,
        currentPage: page,
        totalPage: totalCount % size ? totalPage + 1 : totalPage,
        results: body.hits.hits.map((item) => item._source),
      };
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  return { createDocument, getSuggestions};
};

export default ESConfig({ESClient: elasticClient})
