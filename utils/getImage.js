require("dotenv").config();

const ENVR = parseInt(process.env.ENVR);

export const getImage = (path) => {
    if(ENVR === 0) return `${process.env.BASE_URL}:${process.env.APP_PORT}/public/${path}`;
    if(ENVR === 1) return `${process.env.STAG_URL}:${process.env.APP_PORT}/public/${path}`;
}