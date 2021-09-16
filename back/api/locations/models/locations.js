'use strict';

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.Name) {
        data.slug = await strapi
        .plugins['content-manager']
        .services
        .uid
        .generateUIDField({
          contentTypeUID: 'application::locations.locations',
          field: 'slug',
          data,
        })
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.Name && !data['slug']) {
        data.slug = await strapi
        .plugins['content-manager']
        .services
        .uid
        .generateUIDField({
          contentTypeUID: 'application::locations.locations',
          field: 'slug',
          data,
        })
      }
    },
  },
};
