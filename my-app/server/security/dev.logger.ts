import { format, createLogger, transports} from 'winston';

export default class DevLogger {
    public static log = createLogger({
        level: 'debug',
        format: format.combine(
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            //format.json(), 
            format.colorize({all: true}),
            format.prettyPrint({depth: 5}),
            format.label({label: '[LOGGER]'}),
            format.printf( info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`)
            ),
        transports: [
            new transports.Console()
        ],
    });
}