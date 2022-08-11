import postgresConfig from "./postgres";
import jwtConfiguration from "./jwt";
import mongoConfig from "./mongo";

const getConfiguration = ()  => {
     return {
         postgres: postgresConfig(),
         jwt: jwtConfiguration(),
         mongo: mongoConfig()
     }
}

export default getConfiguration;