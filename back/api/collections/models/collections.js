'use strict';

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.Title) {
        data.slug = await strapi
        .plugins['content-manager']
        .services
        .uid
        .generateUIDField({
          contentTypeUID: 'application::collections.collections',
          field: 'slug',
          data,
        })
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.Title) {
        data.slug = await strapi
        .plugins['content-manager']
        .services
        .uid
        .generateUIDField({
          contentTypeUID: 'application::collections.collections',
          field: 'slug',
          data,
        })
      }
    },
  },
};
