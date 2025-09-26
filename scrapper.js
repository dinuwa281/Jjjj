const fs = require("fs");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const cheerio = require("cheerio");
const axios = require("axios");

async function tiktok(link) {
    const apiEndpoints2 = [
        {
            url: `https://sadiya-tech-apis.vercel.app/download/tiktokdl?url=${link}&apikey=sadiya`,
            extract: (data) => ({
                sd: data.result?.nowm,
                hd: data.result?.nowm,
                title: data.result?.title,
                audio: data.result?.music,
                thumbnail: data.result?.thumbnail || `https://files.catbox.moe/wdzt28.jpg`
            }),
        },
    ];

    try {
        const result = await Promise.any(
            apiEndpoints2.map(async (api) => {
                const res = await fetch(api.url, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                const data = await res.json();
                const extracted = api.extract(data);
                if (!extracted.sd) throw new Error("No video link found");
                return extracted;
            })
        );

        console.log("✅ Found valid link!");
        return result;
    } catch (err) {
        console.error("❌ All endpoints failed.", err);
        return null;
    }
}

async function fbdown(link) {
    const apiEndpoints2 = [
        {
            url: `https://sadiya-tech-apis.vercel.app/download/fbdl?url=${link}&apikey=sadiya`,
            extract: (data) => ({
                sd: data.result?.sd,
                hd: data.result?.sd,
                title: data.result?.title || 'FaceBook Download',
                thumbnail: data.result?.thumb || `https://files.catbox.moe/wdzt28.jpg`,
            }),
        },
    ];

    try {
        const result = await Promise.any(
            apiEndpoints2.map(async (api) => {
                const res = await fetch(api.url, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                const data = await res.json();
                const extracted = api.extract(data);
                if (!extracted.sd) throw new Error("No video link found");
                return extracted;
            })
        );

        console.log("✅ Found valid link!");
        return result;
    } catch (err) {
        console.error("❌ All endpoints failed.", err);
        return null;
    }
}




async function getMP3DownloadLink(id) {
 
    const apiEndpoints = [
        {
            url: `https://sadiya-tech-apis.vercel.app/download/ytdl?url=https://youtube.com/watch?v=${id}&format=mp3&apikey=sadiya`,
            extractLink: (data) => data.result?.download,
        },
                {
            url: `https://sadas-ytmp3-new-2.vercel.app/convert?url=https://youtube.com/watch?v=${id}`,
            extractLink: (data) => data.data?.link,
        },
        
       
        // {
            // url: `https://api.giftedtech.web.id/api/download/dlmp3?url=https://youtube.com/watch?v=${id}&apikey=gifted-md`,
            // extractLink: (data) => data.result?.download_url,
        // },
        // {
            // url: `https://api.diioffc.web.id/api/search/ytplay?query=https://youtube.com/watch?v=${id}`,
            // extractLink: (data) => data.download?.url,
        // },
        // {
            // url: `https://apis-keith.vercel.app/download/dlmp3?url=https://youtube.com/watch?v=${id}`,
            // extractLink: (data) => data.result?.downloadUrl,
        // },
        // {
            // url: `https://api.giftedtech.web.id/api/download/ytmp3?apikey=gifted&url=https://youtu.be/${id}?feature=shared`,
            // extractLink: (data) => data.result?.download_url,
        // },
    ];

    try {
        const link = await Promise.any(
            apiEndpoints.map(async (api) => {
                try {
                    const res = await fetch(api.url, {
                        headers: { 'User-Agent': 'Mozilla/5.0' }
                    });
                    const data = await res.json();
                    const downloadLink = api.extractLink(data);
                    if (!downloadLink) throw new Error("Invalid link");
                    // ✅ මෙන්න API එක සහ ලින්ක් එක console.log කරන්න
                    console.log(`✅ Valid link from: ${api.url}`);
                    console.log(`🔗 Download link: ${downloadLink}`);
                    return downloadLink;
                } catch (e) {
                    throw e; // fail this promise to continue Promise.any
                }
            })
        );

        return link;
    } catch (err) {
        console.log("❌ All endpoints failed.");
        return "No link available";
    }
}

async function getMP4DownloadLink(id) {
 
    const apiEndpoints = [
        {
            url: `https://sadiya-tech-apis.vercel.app/download/ytdl?url=https://youtube.com/watch?v=${id}&format=360&apikey=sadiya`,
            extractLink: (data) => data?.result?.download,
        },
        // {
            // url: `https://api.giftedtech.web.id/api/download/dlmp3?url=https://youtube.com/watch?v=${id}&apikey=gifted-md`,
            // extractLink: (data) => data.result?.download_url,
        // },
        // {
            // url: `https://api.diioffc.web.id/api/search/ytplay?query=https://youtube.com/watch?v=${id}`,
            // extractLink: (data) => data.download?.url,
        // },
        // {
            // url: `https://apis-keith.vercel.app/download/dlmp3?url=https://youtube.com/watch?v=${id}`,
            // extractLink: (data) => data.result?.downloadUrl,
        // },
        // {
            // url: `https://api.giftedtech.web.id/api/download/ytmp3?apikey=gifted&url=https://youtu.be/${id}?feature=shared`,
            // extractLink: (data) => data.result?.download_url,
        // },
    ];

    try {
        const link = await Promise.any(
            apiEndpoints.map(async (api) => {
                try {
                    const res = await fetch(api.url, {
                        headers: { 'User-Agent': 'Mozilla/5.0' }
                    });
                    const data = await res.json();
                    const downloadLink = api.extractLink(data);
                    if (!downloadLink) throw new Error("Invalid link");
                    // ✅ මෙන්න API එක සහ ලින්ක් එක console.log කරන්න
                    console.log(`✅ Valid link from: ${api.url}`);
                    console.log(`🔗 Download link: ${downloadLink}`);
                    return downloadLink;
                } catch (e) {
                    throw e; // fail this promise to continue Promise.any
                }
            })
        );

        return link;
    } catch (err) {
        console.log("❌ All endpoints failed.");
        return "No link available";
    }
}






module.exports = {tiktok, fbdown, getMP3DownloadLink, getMP4DownloadLink};