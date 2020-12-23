import ESService from "../service/elasticsearch.service";

type Dependencies = {
  getSuggestions: (data: any) => any;
};

const GetImage = (dependencies: Dependencies) => {
  const { getSuggestions } = dependencies;
  
  const handleRequest = async (req, res) => {
    try {
      const { search, page, size } = req.query;
      const result = await getSuggestions({search, size, page});
      if (result && result.totalCount > 0) {
        res.status(200).json(result);
      } else {
        res.status(204);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  };

  return { handleRequest }
}

export default GetImage(ESService);