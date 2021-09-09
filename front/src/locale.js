module.exports = {
  num: {
    en: num => num,
    ar: num => num
    .toString()
    .replace( /[0-9]/g, 
      w => [
        '۰',
        '۱',
        '۲',
        '۳',
        '۴',
        '۵',
        '۶',
        '۷',
        '۸',
        '۹'
      ][+w]
    )
  },
  aob: {
    name: {
      en: 'Archive of Belonging',
      ar: 'أرشيف الانتماء',
      shorthand: 'AOB',
      slug: '/',
    }
  },
  menuItems: [
    {
      name: {
        en: 'Archive',
        ar: 'الأرشيف',
      },
      slug: '/archive'
    },
    {
      name: {
        en: 'Exhibition',
        ar: 'المعرض',
      },
      slug: '/exhibition'
      // slug: '/artworks'
    },
    {
      name: {
        en: 'Collections',
        ar: 'المجموعات',
      },
      slug: '/collections'
    },
    {
      name: {
        en: 'Info',
        ar: 'حول',
      },
      slug: '/info'
    },
  ],
  tableHeaders: {
    id: {
      name: {
        en: ':)',
        ar: 'رمز',
      },
    },
    organisation: {
      name: {
        en: 'organisation',
        ar: 'منظمة',
      },
    },
    tags: {
      name: {
        en: 'tags',
        ar: 'تصنيفات',
      },
    },
    description: {
      name: {
        en: 'description',
        ar: 'وصف',
      },
    },
    locations: {
      name: {
        en: 'locations',
        ar: 'مواقع',
      },
    },
    source: {
      name: {
        en: 'source',
        ar: 'مصدر',
      },
    },
    contact: {
      name: {
        en: 'contact',
        ar: 'اتصل',
      },
    },
    updated: {
      name: {
        en: 'updated',
        ar: 'محدث',
      },
    },
    artist: {
      name: {
        en: 'artist',
        ar: 'فنان',
      },
    },
    medium: {
      name: {
        en: 'medium',
        ar: 'الوسيط',
      },
    },
    title: {
      name: {
        en: 'title',
        ar: 'اسم',
      },
    },
    
  },
  search: {
    placeholder: {
      en: 'search',
      ar: 'ابحث'
    },
    empty: {
      en: 'Your query yields 0 results.',
      ar: 'استفسارك يعطي 0 نتائج.'
    }
  },
  info: {
    updated_at:{
      en: 'This text was last updated on',
      ar: 'تم تحديث هذا النص آخر مرة في'
    },
    inNumbers: {
      en: 'The Archive in Numbers',
      ar: 'الأرشيف بالأرقام'
    },
    total: {
      en: 'Total entries',
      ar: 'إجمالي الإدخالات'
    },
    resources: {
      en: 'Resources',
      ar: 'مصادر'
    },
    artworks: {
      en: 'Artworks',
      ar: 'اعمال فنية'
    },
    collections: {
      en: 'Collections',
      ar: 'مجموعات'
    },
    archive_updated_at: {
      en: 'The archive was last updated on',
      ar: 'تم تحديث الأرشيف في'
    },
    contribute: {
      en: 'You can contribute a resource or artwork to the archive.',
      ar: 'يمكنك المساهمة بمصدر أو بعمل فني إلى الأرشيف.'
    },
    repo: {
      en: 'The code running the archive is published under the CC-by-SA-4.0 license and can be found here:',
      ar: 'يتم نشر الكود الذي يقوم بتشغيل الأرشيف بموجب ترخيص CC-by-SA-4.0 ويمكن العثور عليه هنا:'
    }
    
    
  },
  media: {
    unknownRights: {
      en: "Copyright information not provided.",
      ar: "لم يتم توفير معلومات حقوق النشر."
    },
    mediaNotAvailable: {
      en: "No media available for this entry.",
      ar: "لا توجد وسائط متاحة لهذا الإدخال."
    }
  },
  collections: {
    defaults: {
      Title: {
        en: 'Unnamed Collection',
        ar: 'مجموعة بدون اسم',
      },
      Author: {
        en: 'Anonymous',
        ar: 'المؤلف غير معروف'
      },
      Description: {
        en: 'No Description',
        ar: 'الوصف غير موجود',
      },
      empty: {
        en: 'There is nothing in your collection. To add a resource or artwork to your collection, click the plus button to the left of it.',
        ar: 'مجموعتك فارغة. لإضافة مورد أو عمل فني إلى مجموعتك ، انقر فوق زر علامة الجمع الموجود على يسارها.'
      }
    },
    mine: {
      Title: {
        en: 'Your Collection',
        ar: 'مجموعتك'
      },
      slug: 'my-collection',
      Author: {
        en: 'Optionally add your name',
        ar: 'أضف اسمك اختياريًا'
      },
      Description: {
        en: 'Describe this collection.',
        ar: 'صِف هذه المجموعة',
      },
    },
    upload: {
      sending: {
        title: {
          en: 'Sending collection...',
          ar: 'إرسال المجموعة ...'
        },
        body: { 
          en: 'Please wait.',
          ar: 'الرجاء الانتظار', 
        }
      },
      sent: {
        title: {
          en: 'Received!',
          ar: 'تم الاستلام!'
        },
        body: {
          en: 'Thank you for your contribution. Your collection will be processed soon.',
          ar: 'شكرا لمساهمتك. ستتم معالجة مجموعتك قريبًا.'
        }
      },
      errored: {
        title: {
          en: 'Error.',
          ar: 'خطأ.'
        },
        body: {
          en: 'This is likely a network error.',
          ar: 'من المحتمل أن يكون هذا خطأ في الشبكة.'
        }
      }
    }
  },
  buttons: {
    submitResource: {
      en: 'submit a resource',
      ar: 'قدم مصدر '
    },
    submitArtwork: {
      en: 'submit an artwork',
      ar: 'قدم عمل فني  '
    },
    submit: {
      en: 'submit',
      ar: 'أرسل'
    },
    print: {
      en: 'print',
      ar: 'اطبع'
    },
    clear: {
      en: 'clear',
      ar: 'عيد'
    },
    return: {
      en: 'return',
      ar: 'أرجع'
    }
  }

}