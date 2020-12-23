import { Client } from "elasticsearch";
import { elasticClient } from "../../config/es.config";
import { getObj } from "../../helpers/cast.helper";

type ESDependencies = {
  ESClient: Client;
};
const indexName = "randomindex";

export const ESConfig = (dependencies: ESDependencies) => {
  const { ESClient } = dependencies;

  ESClient.ping(
    {
      requestTimeout: 30000,
    },
    function (error) {
      if (error) {
        console.error("elasticsearch cluster is down!");
      } else {
        console.log("All is well");
      }
    }
  );

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

  async function getSuggestions(input, size = 20, page) {
    try {
      const response = await ESClient.search({
        size,
        from: page,
        q: input,
      });

      /// had to force a type cast because it seems the interface hadn't been updated yet.
      const totalCount = getObj(response.hits.total).value;
      const totalPage = Math.floor(totalCount / size);
      return {
        totalCount,
        currentPage: page,
        totalPage: totalCount % size ? totalPage + 1 : totalPage,
        results: response.hits.hits.map((item) => item._source),
      };
    } catch (error) {
      console.log(error.message);
    }
  }

  return { createDocument, getSuggestions};
};

export default ESConfig({ESClient: elasticClient})
