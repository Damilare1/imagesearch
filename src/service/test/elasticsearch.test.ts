import { ESSearch } from "../elasticsearch.service";


describe("S3Services", () => {
  it("It calls AWS delete method", async (done) => {
    
    const dependencies = {
        createDocument: (item )=> {},
        getSuggestions: (search, size, page) => { },
    };
    

    dependencies.createDocument = jest.fn();


    const MockS3Services = ESSearch(dependencies);

    const result = await MockS3Services.addDocument({});
    expect(dependencies.createDocument).toHaveBeenCalled();
    done();
  });

  it("It calls Multer method", async (done) => {
    
    const dependencies = {
        createDocument: (item )=> {},
        getSuggestions: (search, size, page) => { },
    };
    

    dependencies.getSuggestions = jest.fn();


    const MockS3Services = ESSearch(dependencies);

    const result = await MockS3Services.getSuggestions({search: "", size: "", page:""});
    expect(dependencies.getSuggestions).toHaveBeenCalled();
    done();
  });

});

afterAll(async (done) => {
    done();
  });
  
