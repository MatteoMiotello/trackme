import postgresConfig from "./postgres";

const getConfiguration = ()  => {
     return {
         postgres: postgresConfig()
     }
}

export default getConfiguration;