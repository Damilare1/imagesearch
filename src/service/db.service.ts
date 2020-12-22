import { Pool } from "pg";

export class DBInteractor {
  private pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  InsertDBQuery = (
    itemsArr: Array<string>,
    successCb: () => void,
    errorCb: () => void
  ) => {
    
   this.pool.query(
      `INSERT INTO images_data (description, url, name, size, type) VALUES ($1, $2, $3, $4, $5)`,
      itemsArr,
      (error: any, results: any) => {
        if (error) {
          errorCb();
          throw error;
        }
          successCb();
      }
    );
  }
}
