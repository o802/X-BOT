const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'BELTAH-MD;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUZLZ2ZjbnVXelRxcUNPQ3Ava0hIeVlhYmhrejlOU3hObEVzeVU1SHJVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkhOV1l6c3B4dThpQmpZdFQ4aVNhMllPbmZkMkRRMFNzU1RWRzFBVWFIQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSmZ3VDFiUXB2WEVvTFhRc0w1T3dHUkVZR0RTcDlGTXJGMlNkU0hzRTFJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlVExUZXl1bm9TN2traVJFcnRRcHpDbmFtRngydzEzcDM1L2dEdWxzVTJNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdGNEVKdHNiQzByeWZHTW1QaWxCL0pHZGZRcm9MNklKTWxqNkgwcUIyazQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJFdW13Vjg5cEN1SFVsMEZrMUVscmlDc2VENUhlMEtXZDgyeDgvNk5EbGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUZhM0p1WStvQUc5Unl5aW9nY3crYWZ2MnI4WHZOR3l5dTJvSUg5ekQyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUptUm1ndkUvRHZYSVRLQ2d2L0JsVlpLVmM3eFNIVHpKc3hWd3lhdEl3VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQrSDdSRDJ6RS8yUTBrK2xrVmU1dDZCUFhWOTVQSDlKdXZmcmVxT3M4a0g1Y1BUSTlsZEFLNHk3eklnSTBoQTlZbmV4RE9oN1VwNDNLYkNXRUNhaEFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc0LCJhZHZTZWNyZXRLZXkiOiJWcXRyVk9Jc2FOOFVLTUFrTjJnQlZFOGFiTFpGa1dHMVZGODRycFZxVHBZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwMjYxMzgzODRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzc5MkFDMTBEMEJFNzQ1MEEyNTcxRjZBQjA2RjBBOEQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzM0NzQ0M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0NzAyNjEzODM4NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4MTBBOTJGRjZCMTMzMDM2RkY5MTQ2RDM3M0I4NTU0MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3MzQ3NDUyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNOZVAwcGtIRU12UG1jRUdHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIyVUZmZitvbnI1eU1ZWk95ak9vVFQyZWNTTlN3OHoyaXc4NU1PbUFKc0FFPSIsImFjY291bnRTaWduYXR1cmUiOiJKUHlHU1NjZ2FaTFp1QzBVSDlKcmtsbmM1QXF0YWJEYzVSZkVHcjNPK0JQak04S3hSV2twNE5FSWREcS9BTGxTcXp2MW1qcnVIejh4YkEyMmtlTWtDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidEZiK3hLcDhkRytza202ODJGQkRMUzkvOU55N0JRR1hOYldlc0hYeTZnWnlURmU5NDY5VnVncU5EUmF6OTVnamlpVHcyZy92VmN0SFRFejU1Z0dyQXc9PSJ9LCJtZSI6eyJpZCI6IjIzNDcwMjYxMzgzODQ6NjhAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxODQzMjMxNTIwODA5NTE6NjhAbGlkIiwibmFtZSI6IvCdlbTwnZW/8J2WhSDwnZWt8J2VvfCdlbTwnZWs8J2VuSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDI2MTM4Mzg0OjY4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRsQlgzL3FKNitjakdHVHNvenFFMDlubkVqVXNQTTlvc1BPVERwZ0NiQUIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzM0NzQxOSwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPZXEifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Beltah254/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Beltah254",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347026138384",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    URL: process.env.URL || "https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    EMOJIS: process.env.EMOJIS || "👻,☺️,❤️,🦚",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_CONTROL || 'no', 
    GREET : process.env.GREET || "no",            
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || 'viewed by Beltah md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTOBIO: process.env.AUTOBIO || 'yes',       
    ANTICALL_MSG : process.env.ANTICALL_MESSAGE || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VAUSV0PFCCOSB5TX9C1F",
    EVENTS :process.env.EVENTS || "yes",
    CAPTION : process.env.CAPTION || "BELTAH-MD",
    BOT : process.env.BOT_NAME || '𝗕𝗘𝗟𝗧𝗔𝗛-𝗠𝗗',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
