'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

  async create(ctx) {
    let
      resource = JSON.parse(ctx.request.body.data),
      entity,
      tags = [],
      locations = []

    console.log(resource, ctx)

    if (resource.tags.length > 0) {
      for (let i = 0; i < resource.tags.length; i++) {
        const tag = resource.tags[i]
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
      resource.tags = tags
    }

    if (resource.locations.length > 0) {
      for (let i = 0; i < resource.locations.length; i++) {
        const location = resource.location[i]
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
            locations.push(newLocation.id)
          }
        }
      }
      resource.locations = locations
    }

    if (ctx.is('multipart')) {
      const { files } = parseMultipartData(ctx)
      entity = await strapi.services.resources.create(resource, { files })
    } else {
      entity = await strapi.services.resources.create(resource)
    }
    return sanitizeEntity(entity, { model: strapi.models.resources })
  },
};
