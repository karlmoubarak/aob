module.exports = {
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
        en: 'About',
        ar: 'حول',
      },
      slug: '/about'
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
        en: 'There is nothing in your collection.',
        ar: 'مجموعتك فارغة.'
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