'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

  async create(ctx) {
    let
      artwork = JSON.parse(ctx.request.body.data),
      entity,
      tags = []

    // console.log(ctx, artwork)

    if (artwork.tags.length > 0) {
      for (let i = 0; i < artwork.tags.length; i++) {
        const tag = artwork.tags[i]
        if (typeof(tag) === 'number') {
          tags.push(tag)
        } else {
          let check = await strapi.query('tags').find({ Name: tag })

          // console.log(check)

          if (check.length > 0 && check[0].Name === tag) {
            tags.push(check[0].id)
          } else {
            let newTag = await strapi.query('tags').create({
              Name: tag,
              published_at: null
            })
            tags.push(newTag.id)
          }
        }
      }
      artwork.tags = tags
      // console.log(artwork.tags)
    }



    if (ctx.is('multipart')) {
      // need to adjust this for the tags, right now it will break
      console.log('is Multipart')
      // const { data, files } = parseMultipartData(ctx);
      // entity = await strapi.services.article.create(data, { files });
    // } else {
      // pass the new request body with the proper array of IDs and create the article
      // entity = await strapi.services.article.create(newArticle);
    }
    return sanitizeEntity(entity, { model: strapi.models.artwork });
  },
};
