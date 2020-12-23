import pgtools from 'pgtools';
import { DBConfig } from '../../config/database.config';

const config = DBConfig.database;

pgtools.createdb(config.connectionString, config.database, function (err, res) {
    if (err) {
        console.error(err);
        process.exit(-1);
    } else {
        console.log('Success!');
        process.exit(-1);
    }
});