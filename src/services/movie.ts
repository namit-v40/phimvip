type Data = {}

type Props = {
    data: { 
        name: any; 
        slug: any; 
        origin_name: any; 
        content: any; 
        poster_url: any; 
        thumb_url: any; 
        time: any; 
        episode_current: any; 
        episode_total: any; 
        quality: any; 
        lang: any; 
        status: string; 
        type: any; 
        year: any; 
        category: string[]; 
        country: string[]; 
        actor: string[]; 
        director: string[]; 
    }, 
    updateState: (arg0: string, arg1: number) => void, 
    optionState: { 
        typeOptions: Data[]; 
        yearOptions: Data[]; 
        categoryOptions: Data[]; 
        countryOptions: Data[]; 
        actorOptions: Data; 
        directorOptions: Data;
    }
}


// Function auto fill movie data when fetch api
export const handleAutoFillMovieData = async ({data, updateState, optionState}: Props) => {
    const findOrCreateOption = (options: any[], key: string, value: any, defaultOptions: { act_name?: any; sort_order?: number; status: boolean; value: any; label: any; dir_name?: any; }) => options.find(option => option[key] === value) || defaultOptions;

    updateState("name", data.name || '');
    updateState("slug", data.slug || '');
    updateState("originName", data.origin_name || '');
    updateState("content", data.content || '');
    updateState("posterUrl", data.poster_url || '');
    updateState("thumbUrl", data.thumb_url || '');
    updateState("time", data.time || '');
    updateState("epCurrent", data.episode_current || '');
    updateState("epTotal", data.episode_total || '');
    updateState("quality", data.quality || '');
    updateState("lang", data.lang || '');
    
    updateState("status", data.status==="completed"?1:0);

    // Check and update the movie type if valid
    if (data.type && optionState.typeOptions.some(type => type.type_slug === data.type)) {
        updateState("type", data.type);
    }

    // Check and update the year if valid
    if (data.year && optionState.yearOptions.some(year => year.year_name === data.year)) {
      updateState("year", data.year);
    }

    // Filter categories by slug and update if valid
    if (Array.isArray(data.category)) {
        const filteredCategories = optionState.categoryOptions.filter(cat =>
            data.category.some(item => item.slug === cat.cat_slug)
        );
        updateState("category", filteredCategories);
    }

    // Filter countries by slug and update if valid
    if (Array.isArray(data.country)) {
        const filteredCountries = optionState.countryOptions.filter(ctr =>
            data.country.some(item => item.slug === ctr.ctr_slug)
        );
        updateState("country", filteredCountries);
    }

    // Filter and update actors if they exist
    if (Array.isArray(data.actor)) {
        const filteredActors = data.actor.map(actor =>
            findOrCreateOption(optionState.actorOptions, 'act_name', actor, {
                act_name: actor,
                sort_order: 10,
                status: true,
                value: actor,
                label: actor
            })
        );
        updateState("actor", filteredActors);
    }

    // Filter and update directors, ensuring "Đang cập nhật" is excluded
    if (Array.isArray(data.director)) {
        const filteredDirectors = data.director
            .filter(director => director !== "Đang cập nhật")
            .map(director =>
                findOrCreateOption(optionState.directorOptions, 'dir_name', director, {
                    dir_name: director,
                    status: true,
                    value: director,
                    label: director
                })
            );
        updateState("director", filteredDirectors);
    }
}

// Function auto fill episode data when fetch api
export const handleAutoFillEpisodeData = async (data: any[], setListEp: (arg0: any) => void)=>{
    setListEp(data.reduce((acc, ep) => {
        ep.server_data.forEach((epDetail: any, index: number) => {
            acc.push({
                ...epDetail,
                id: index+1,
                sort_order: index+1
            });
        });
        return acc;
    }, []));
}