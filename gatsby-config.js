const siteMetadata = require('./site-metadata.json')
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })

module.exports = {
    pathPrefix: '/',
    siteMetadata: siteMetadata,
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        `gatsby-transformer-remark`,
        {
            resolve: `gatsby-plugin-netlify-cms`,
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
            // The property ID; the tracking code won't be generated without it
            trackingId: process.env.GA_TRACKING_ID,
            }
        },
        {
            resolve: `gatsby-plugin-disqus`,
            options: {
                shortname: process.env.GATSBY_DISQUS_NAME
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`
            }
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {}
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {}
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
            }
        }
    ]
};
