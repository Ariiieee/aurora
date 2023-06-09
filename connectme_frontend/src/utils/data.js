export const categories = [
  {
    name: 'cars',
    image: 'https://i.pinimg.com/564x/ad/ea/a1/adeaa1d253aa4b4f103f88aec77bb0eb.jpg',
  },

  {
    name: 'wallpaper',
    image: 'https://i.pinimg.com/564x/0d/3c/83/0d3c8368382e1cefe64841dac7de9862.jpg',
  },
  {
    name: 'web Design',
    image: 'https://i.pinimg.com/564x/c3/37/55/c337550278063c4f9a76ae704b704830.jpg',
  },
  {
    name: 'anime',
    image: 'https://i.pinimg.com/564x/1a/02/3e/1a023e3e172af29cfee6c906cfa0990e.jpg',
  },
  {
    name: 'food',
    image: 'https://i.pinimg.com/564x/e2/db/0c/e2db0c5074013d04ed60e77c3d1c7c27.jpg',
  },
  {
    name: 'nature',
    image: 'https://i.pinimg.com/564x/a0/56/9e/a0569ebdf9d66c593b558742cd46eac9.jpg',
  },
  {
    name: 'art',
    image: 'https://i.pinimg.com/564x/29/1a/1a/291a1a2e4e3707ee692dc6d9af2d2a83.jpg',
  },
  {
    name: 'travel',
    image: 'https://i.pinimg.com/564x/dc/97/4e/dc974e453e02886762d75825dca5c7f3.jpg',
  },
  {
    name: 'quotes',
    image: 'https://i.pinimg.com/564x/b4/e6/24/b4e62402d58034690486c384d2d6727e.jpg',
  },
  {
    name: 'cats',
    image: 'https://i.pinimg.com/564x/26/c7/35/26c7355fe46f62d84579857c6f8c4ea5.jpg',
  },

  {
    name: 'dogs',
    image: 'https://i.pinimg.com/564x/ac/de/09/acde0921b775ffb3eb44c776df3d2ce2.jpg',
  },
  {
    name: 'other',
    image: 'https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg',
  },
];


export const userQuery = (userId) => {
  const query = `*[_type == "user"&& _id == '${userId}']`
  return query
}


export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin"&& title match '${searchTerm}*'|| category match '${searchTerm}*'|| about match '${searchTerm}*']{
            image {
              asset -> {
                 url
                 }
            },
            _id,
            destination,
            postedBy -> { 
              _id,
               userName,
                image}
                ,
            save []{ _key,
                      postedBy -> {
                         _id, 
                         userName, 
                         image
                        },
                    },
     }`
  return query
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc){
  image { asset -> { url }},
  _id,
  destination,
  postedBy -> {_id, userName,image,},
  save [] {
            _key,
            postedBy -> {_id, userName,image,},
          },
}`

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};


