// 'use strict';

// const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

// module.exports = {

//   async create(ctx) {
//     let
//       artwork = ctx.request.body,
//       entity,
//       tags = []

//     if (artwork.tags.length > 0) {
//       for (let i = 0; i < artwork.tags.length; i++) {
//         const tag = artwork.tags[i]
//         if (typeof(tag) === 'number') {
//           tags.push(tag)
//         } else {
//           let check = await strapi.query('tag').find({ Name: tag['Name'] })

//           console.log(check)

//           // If it exists, push that id into an array, else create it and push the new ID
//           // if (check.length > 0 && check[0].name === newArticle.tags[i]) {
//           //   tags.push(check[0].id)
//           // } else {
//           //   let newTag = await strapi.query('tag').create({ name: newArticle.tags[i]})
//           //   tags.push(newTag.id)
//           // }
//         }
//       }
//       // Overwrite the ctx.request.body.tags with the new integer based array
//       // newArticle.tags = tags
//     }



//     // if (ctx.is('multipart')) {
//     //   // need to adjust this for the tags, right now it will break
//     //   const { data, files } = parseMultipartData(ctx);
//     //   entity = await strapi.services.article.create(data, { files });
//     // } else {
//     //   // pass the new request body with the proper array of IDs and create the article
//     //   entity = await strapi.services.article.create(newArticle);
//     // }
//     return sanitizeEntity(entity, { model: strapi.models.article });
//   },
// };
