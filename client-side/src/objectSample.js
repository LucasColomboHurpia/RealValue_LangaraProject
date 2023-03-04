let sample = [
    {
      image: 'https://remax-listingphotos-ca5.imgix.net/rets-images-vancouver-can/1b49ca2c9eada6022c422c28f254cc5343c35167-1-large.jpeg?fit=max&auto=format,compress&fm=pjpg&cs=srgb&q=35&h=500',
      price: '$9,388,000',
      adress1: '5637 LABURNUM STREET',
      adress2: 'Vancouver, BC, V6M 3S7',
      area: '6,345',
      link: 'https://www.remax.ca/luxury/bc/vancouver-real-estate/5637-laburnum-street-wp_idm00000671-r2756752-lst',
      type: 'Single Family',
      age: 'N/A',
      ratio: 1479.59
    },
    {
      image: 'https://remax-listingphotos-ca5.imgix.net/rets-images-vancouver-can/4e686d9bf2486420f96030251ace28d11594c14b-1-large.jpeg?fit=max&auto=format,compress&fm=pjpg&cs=srgb&q=35&h=500',
      price: '$1,598,000',
      adress1: '7206 ONTARIO STREET',
      adress2: 'Vancouver, BC, V5X 3B7',
      area: '1,207',
      link: 'https://www.remax.ca/bc/vancouver-real-estate/7206-ontario-street-wp_idm00000671-r2757017-lst',
      type: 'Single Family',
      age: 'N/A',
      ratio: 1323.94
    },
    {
      image: 'https://remax-listingphotos-ca5.imgix.net/rets-images-vancouver-can/54311641e82d6eb799094b6d7e4ec73843750b7a-1-large.jpeg?fit=max&auto=format,compress&fm=pjpg&cs=srgb&q=35&h=500&blur=200',
      price: '$1,090,000',
      adress1: '906-8555 GRANVILLE STREET',
      adress2: 'Vancouver, BC, V6P 4Z9',
      area: '997',
      link: 'https://www.remax.ca/bc/vancouver-real-estate/906-8555-granville-street-wp_idm00000671-r2756966-lst',
      type: 'Condo',
      age: 'N/A',
      ratio: 1093.28
    },
    {
      image: 'https://remax-listingphotos-ca5.imgix.net/rets-images-vancouver-can/d1ba20e4c70c03189cfbca7ea592f4843ce657d7-1-large.jpeg?fit=max&auto=format,compress&fm=pjpg&cs=srgb&q=35&h=500',
      price: '$799,900',
      adress1: '201-5733 ALBERTA STREET',
      adress2: 'Vancouver, BC, V5Y 0M3',
      area: '535',
      link: 'https://www.remax.ca/bc/vancouver-real-estate/201-5733-alberta-street-wp_idm00000671-r2757155-lst',
      type: 'Condo',
      age: 'N/A',
      ratio: 1495.14
    },
    {
      image: 'https://remax-listingphotos-ca5.imgix.net/rets-images-vancouver-can/55b4963f4ca08f58957cd16f4ea934b85eec0001-1-large.jpeg?fit=max&auto=format,compress&fm=pjpg&cs=srgb&q=35&h=500',
      price: '$869,000',
      adress1: '803-8031 NUNAVUT LANE',
      adress2: 'Vancouver, BC, V5X 0C9',
      area: '775',
      link: 'https://www.remax.ca/bc/vancouver-real-estate/803-8031-nunavut-lane-wp_idm00000671-r2756784-lst',
      type: 'Condo',
      age: 'N/A',
      ratio: 1121.29
    },
    {
      image: 'https://assets-listings.rew.ca/brc_idx_rew/brc/R2751597/20230210172828/01.jpeg?auto=format&fit=crop&crop=top%2C%20left&ixlib=react-8.5.1&h=500&w=753',
      price: '$998,000',
      adress1: '307 588 W 45th Avenue',
      adress2: 'Vancouver, BC, V5Z 4S3',
      area: '966 Sqft',
      link: 'https://www.rew.ca/properties/4855397/307-588-w-45th-avenue-vancouver-bc?search_params%5Bquery%5D=Oakridge+vancouver',        
      type: '0',
      age: 'N/A',
      ratio: 1033.13
    },
    {
      image: 'https://assets-listings.rew.ca/brc_idx_rew/brc/R2751093/20230208034240/01.jpeg?auto=format&fit=crop&crop=top%2C%20left&ixlib=react-8.5.1&h=500&w=753',
      price: '$1,480,000',
      adress1: '6150 Oak Street',
      adress2: 'Vancouver, BC, V6M 2W2',
      area: '1265 Sqft',
      link: 'https://www.rew.ca/properties/4851649/6150-oak-street-vancouver-bc?search_params%5Bquery%5D=Oakridge+vancouver',
      type: '1',
      age: 'N/A',
      ratio: 1169.96
    },
    {
      image: 'https://assets-listings.rew.ca/brc_idx_rew/brc/R2754553/20230222193845/01.jpeg?auto=format&fit=crop&crop=top%2C%20left&ixlib=react-8.5.1&h=500&w=753',
      price: '$4,500,000',
      adress1: '458 W 44th Avenue',
      adress2: 'Vancouver, BC, V5Y 2V6',
      area: '2139 Sqft',
      link: 'https://www.rew.ca/properties/4879875/458-w-44th-avenue-vancouver-bc?search_params%5Bquery%5D=Oakridge+vancouver',
      type: 'House',
      age: '54 ft x 123 ft (6656 ft²)',
      ratio: 2103.79
    },
    {
      image: 'https://assets-listings.rew.ca/brc_idx_rew/brc/R2751597/20230210172828/01.jpeg?auto=format&fit=crop&crop=top%2C%20left&ixlib=react-8.5.1&h=500&w=753',
      price: '$998,000',
      adress1: '307 588 W 45th Avenue',
      adress2: 'Vancouver, BC, V5Z 4S3',
      area: '966 Sqft',
      link: 'https://www.rew.ca/properties/4855397/307-588-w-45th-avenue-vancouver-bc?search_params%5Bquery%5D=Oakridge+vancouver',        
      type: '0',
      age: 'N/A',
      ratio: 1033.13
    },
    {
      image: 'https://assets-listings.rew.ca/brc_idx_rew/brc/R2752481/20230220041040/01.jpeg?auto=format&fit=crop&crop=top%2C%20left&ixlib=react-8.5.1&h=500&w=753',
      price: '$2,999,000',
      adress1: '76 W 48th Avenue',
      adress2: 'Vancouver, BC, V5Y 2Y4',
      area: '1600 Sqft',
      link: 'https://www.rew.ca/properties/4863647/76-w-48th-avenue-vancouver-bc?search_params%5Bquery%5D=Oakridge+vancouver',
      type: 'House',
      age: '33 ft x 142 ft (4686 ft²)',
      ratio: 1874.38
    }
  ]

  export default  sample;