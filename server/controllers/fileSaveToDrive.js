require("dotenv").config();

const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REQUEST_URI = process.env.REQUEST_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REQUEST_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

module.exports = async (req, res, next) => {
    try {
        const createFile = await drive.files.create({
            requestBody: {
                name: "Ilovecr7.jpg",
                mimeType: "image/jpg",
            },
            media: {
                mimeType: "image/jpg",
                body: req.body.image,
            },
        });
        // console.log(createFile);
    } catch (err) {
        console.log(err);
    }
};
