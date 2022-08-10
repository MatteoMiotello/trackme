import postgresConfig from "./postgres";
import jwtConfiguration from "./jwt";

const getConfiguration = ()  => {
     return {
         postgres: postgresConfig(),
         jwt: jwtConfiguration()
     }
}

export default getConfiguration;