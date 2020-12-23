import esImageClient from "../elasticsearch/image.elasticsearch";

type ESClient = {
    createDocument: (item: any) => void;
    getSuggestions: (search, size, page) => any;
  };

export const ESSearch = (ESClient: ESClient) => {
  const addDocument = (payload) => {
    return ESClient.createDocument(payload);
  };

  const getSuggestions = ({ search, size, page }) => {
    return ESClient.getSuggestions(search, size, page);
  };

  return { addDocument, getSuggestions }
};

export default ESSearch(esImageClient);
