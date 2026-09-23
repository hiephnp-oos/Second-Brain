var CONFIG = {
  SHEET_NAME: 'Sheet1',
  LOG_ID: '1ZHvc7sz5A6NREplSuk2UVil4x4iPWqlMxQbTREyb7wg',
  ALLOWED_EXTENSIONS: ['.pdf', '.dwg', '.x_t', '.spt', '.sldprt', '.xlsx', '.cdr', '.gsheet'],
  DRAWING: {
    type: '11.1_Drawing',
    subFolders: ['1. 1-7', '2. A-B', '3. Product'],
    folders: {
      '1or4kyf26KmAJ3i-B3A14Yn28SZfMUeZb': 'Released',
      '1R77bcaL_Rum012SY0peRSqPyEHDAeR88': '2D & pdf',
      '1JHGxw6LUCgPWRa5hMsUM-JGUr_9NoO00': '3D & Corel'
    }
  },
  ACCESSORY: {
    type: '11.2_Accessory',
    DEFAULT_TARGETS: { '1. Release': 'Released', '2. PDF': '2D & pdf', '3. Corel': '3D & Corel' },
    folders: {
      '1yJqPJiWd0seGQzD4chAycrjCxZCZ4-y4': { pathName: '11.2.1_Box&Lot', targets: 'DEFAULT' },
      '1DFJClXCiOwcqQecPdcX6mpaalEIxOXJr': { pathName: '11.2.2_Package manual', targets: { '1. Release': 'Released', '2. Sheet': '3D & Corel' } },
      '1jBjXvIDmEIHM70xzERNyyzBrF_oj1EwU': { pathName: '11.2.3_User manual', targets: 'DEFAULT' },
      '1aYg_Pw3AxeSF6VwXM0A-ibjv-guzmMwe': { pathName: '11.2.4_Label', targets: 'DEFAULT' }
    }
  }
};