'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

  async create(ctx) {
    let
      artwork = JSON.parse(ctx.request.body.data),
      entity,
      tags = [],
      locations = []


    if (artwork.tags.length > 0) {
      for (let i = 0; i < artwork.tags.length; i++) {
        const tag = artwork.tags[i]
        if (typeof(tag) === 'number') {
          tags.push(tag)
        } else {
          let check = await strapi.query('tags').find({ Name: tag })

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
    }

    if (artwork.location.length > 0) {
      for (let i = 0; i < artwork.location.length; i++) {
        const location = artwork.location[i]
        if (typeof(location) === 'number') {
          locations.push(location)
        } else {
          let check = await strapi.query('locations').find({ Name: location })

          if (check.length > 0 && check[0].Name === location) {
            location.push(check[0].id)
          } else {
            let newLocation = await strapi.query('locations').create({
              Name: location,
              published_at: null
            })
            tags.push(newLocation.id)
          }
        }
      }
      artwork.location = locations
    }

    if (ctx.is('multipart')) {
      const { files } = parseMultipartData(ctx)
      entity = await strapi.services.artworks.create(artwork, { files })
    } else {
      entity = await strapi.services.artworks.create(artwork)
    }
    return sanitizeEntity(entity, { model: strapi.models.artworks })
  },
};
