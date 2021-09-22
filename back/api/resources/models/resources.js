'use strict';

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.Organisation && !data['slug']) {
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
      if (data.Organisation && !data['slug']) {
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
