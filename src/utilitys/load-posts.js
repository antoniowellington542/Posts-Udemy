export const loadPosts = async () =>{
    
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);


    const postJson = await posts.json();
    const photostJson = await photos.json();


    const postAndPhotos = postJson.map((post,index) =>{
      return { ...post, cover: photostJson[index].url }
    });

    return postAndPhotos;
  }