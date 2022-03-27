import {useEffect, useState, useCallback } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts/Posts';
import { loadPosts } from '../../utilitys/load-posts';
import { Button } from '../../components/Button/Button';
import { TextInput } from '../../components/TextInput/TextInput';

export const Home = ()=>{

  //ESTADOS GLOBAIS DO MEU CODIGO
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  

  //FUNÇAO ASSINCRONA QUE CARREGA OS DADOS DA REQUISIÇAO DAS IMAGENS E POSTS
  const handleLoadPosts = useCallback( async (page,postsPerPage) => {
    const postAndPhotos = await loadPosts();
    setPosts(postAndPhotos.slice(page, postsPerPage));
    setAllPosts(postAndPhotos);
  }, [])

  //COMPONENT USEEFFECT QUE EXECUTA TODA VEZ QUE O ESTADO É ALTERADO
  useEffect(()=>{
    handleLoadPosts(0,postsPerPage);
  },[handleLoadPosts, postsPerPage])

  //FUNÇAO QUE CARREGA MAIS CARDS NA TELA
  const loadMorePosts = () =>{
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  }

  //FUNÇAO QUE ALTERA O VALOR DO INPUT
  const handleChange = (e) =>{
    const { value } = e.target;
    setSearchValue(value);
  }

  //VARIAVEIS QUE LIMITA NUMERO DE POSTS POR PAGINA
  const noMorePosts = page + postsPerPage >= allPosts.length;

  //CONDIÇAO PARA FILTRAR OS POSTS DE ACORDO COM O INPUT DIGITADO
  const filteredPosts = !!searchValue ? 
      allPosts.filter(post =>{
        return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
  : posts;

  //RETORNO DO COMPONENTE
  return (
    //CONTAINER CONTENDO OS POSTS
    <section className="container">
      <div className="search-container">
        {/*INPUT USADO PRA REALIZAR PESQUISA*/}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {/*CONDIÇAO QUE MOSTRA OS POSTS NA TELA CASO A QUANTIDADE SEJA MAIOR QUE 0*/}
      <Posts posts={ filteredPosts }/>
      {/*BOTÃO QUE CARREGA MAIS POSTS AO SER ACIONADO */}
      <div className="button-container">
        <Button
          searchValue={searchValue}
          text="Load more posts"
          onClick={loadMorePosts}
          disabled={noMorePosts}  
        /> 
      </div>
    </section>
  );
}

