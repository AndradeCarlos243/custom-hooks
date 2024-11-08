import { useEffect, useState } from 'react';

const localCache = {};

export const useFetch = ( url ) => {
    const [state, setState] = useState({ 
        data: null, 
        loading: true,
        hasError: false,
        error: null 
    });

    useEffect(() => {
      getFetch();
    }, [url]);

    const setLoadingState = () => {
        setState({ data: null, loading: true, hasError: false, error: null });
    }

    const getFetch = async () => {
        try {

            if(localCache[url])
            {
                setState({ data: localCache[url], loading: false, hasError: false, error: null });
                return;
            }
            else
            {
                setLoadingState();
            }
            
            const response = await fetch(url);
            await new Promise(resolve => setTimeout(resolve, 1500));
            const data = await response.json();
            if(!response.ok) {
                setState({ data: null, loading: false, hasError: true, error: data });
            }
            const dataPokemon = {
                nombre: data.name,
                tipos: data.types,
                sprites: 
                    {
                        spBack: data.sprites.back_default,
                        spFront: data.sprites.front_default,
                        spBackShiny: data.sprites.back_shiny,
                        spFrontShiny: data.sprites.front_shiny,
                        spFrontText: "sprite frontal",
                        spBackText: "sprite trasero", 
                        spBackShinyText: "sprite trasero shiny",
                        spFrontShinyText: "sprite frontal shiny",
                    }, 
                cries:
                    {
                        cLatest: data.cries.latest,
                        cLegacy: data.cries.legacy,
                    },
            };
            setState({ data: dataPokemon, loading: false, hasError: false, error: null });
            console.log(dataPokemon);
            localCache[url] = dataPokemon;
        }
        catch (error) {
            setState({ data: null, loading: false, hasError: true, error: error.message });
        }
    }

    return {
        ...state
    }
}
