import 'winston-mongodb';
import { format, createLogger, transports} from 'winston';
import { config } from '../config/config';

export default class ProdLogger {
    public static log = createLogger({
        level: 'info',
        format: format.combine(format.timestamp(), format.json()),
        transports: [
            new transports.Console({format: format.combine(format.prettyPrint({ depth: 5 }), format.colorize())}),
            new transports.MongoDB({
                db: config.mongo.url,
                collection: 'logs',
                options: {useUnifiedTopology: true}
            })
        ],
    });
}
