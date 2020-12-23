import { S3Services } from "../s3.service";


describe("S3Services", () => {
  it("It calls AWS delete method", async (done) => {
    
    const dependencies = {
      s3: { deleteObject: (data:any, cb: (err:any, data:any)=> void) => { } },
      Multer: { single: (str: string) => { } },
    };
    

    dependencies.s3.deleteObject = jest.fn();


    const MockS3Services = S3Services(dependencies);

    const result = await MockS3Services.deleteImage("test");
    expect(dependencies.s3.deleteObject).toHaveBeenCalled();
    done();
  });

  it("It calls Multer method", async (done) => {
    
    const dependencies = {
      s3: { deleteObject: (data:any, cb: (err:any, data:any)=> void) => { } },
      Multer: { single: (str: string) => { } },
    };
    

    dependencies.Multer.single = jest.fn();


    const MockS3Services = S3Services(dependencies);

    const result = await MockS3Services.upload;
    expect(dependencies.Multer.single).toHaveBeenCalled();
    done();
  });

});

afterAll(async (done) => {
    done();
  });
  
