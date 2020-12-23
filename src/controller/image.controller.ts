import ESService from "../service/elasticsearch.service";

type Dependencies = {
  getSuggestions: (data: any) => any;
};

export const GetImage = (dependencies: Dependencies) => {
  const { getSuggestions } = dependencies;
  
  const handleRequest = async (req, res) => {
    try {
      const { search, page, size } = req.query;
      const result = await getSuggestions({search, size, page});
      if (result && result.totalCount > 0) {
        res.status(200).json(result);
        return result
      } else {
        let statusCode = 204
        res.status(statusCode);
        return statusCode;
      }
    } catch (err) {
      console.log(err);
      let message = "Internal Server Error"
      res.status(500).send(message);
      return message;
    }
  };

  return { handleRequest }
}

export default GetImage(ESService);