'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

const slugify = require('slugify');

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.Organisation) {
        data.slug = await strapi
        .plugins['content-manager']
        .services
        .uid
        .generateUIDField({
          contentTypeUID: 'application::resources.resources',
          field: 'slug',
          data,
        })
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.Organisation) {
        data.slug = await strapi
        .plugins['content-manager']
        .services
        .uid
        .generateUIDField({
          contentTypeUID: 'application::resources.resources',
          field: 'slug',
          data,
        })
      }
    },
  },
};
