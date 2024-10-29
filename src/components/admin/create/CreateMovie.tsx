"use client";
import React, { useState } from 'react';
import "@/components/loading/Loading.css";
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { request } from '@/lib/common';
import CustomPending from '@/components/loading/CustomPending';
import { MultiSelect } from '@/components/select/MultiSelect';
import { SelectComponent } from '@/components/filter/FilterCard';
import FormCreateMovie from './FormCreateMovie';

type Data = Record<"value" | "label", string>;

type Props = {
    data:{
        categories:Data[]
        countries:Data[]
        years:Data[]
        types:Data[]
        actors:Data[]
        directors:Data[]
    }
}

export default function CreateMovie({ data }:Props) {
    const { toast } = useToast();
    const trans = useTranslations("create_movie");

    const [catSelected, setCatSelected] = React.useState<Data[]>([]);
    const [ctrSelected, setCtrSelected] = React.useState<Data[]>([]);
    const [actorSelected, setActorSelected] = React.useState<Data[]>([]);
    const [directorSelected, setDirectorSelected] = React.useState<Data[]>([]);


    const [isCreating, setIsCreating] = useState(false);
    
    // default state movie data
    const defaultState = {
        name: "", slug: "", originName: "", content: "", type: "series", status: false,
        posterUrl: "", thumbUrl: "", time: "", epCurrent: "", epTotal: "",
        quality: "HD", lang: "Vietsub", year: "2024", category: [], country: [], actor: [], director: []
    };
    
    // state of movie data
    const [state, setState] = useState(defaultState);
    const updateState = (key: string, value: any) => setState(prev => ({ ...prev, [key]: value }));

    // state of list of episodes
    const [listEp, setListEp] = useState([]);

    // state movie API link input
    const [api, setApi] = useState("");
    const [isCallApi, setIsCallApi] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    // function to handle API call for fetching movie data
    const handleCallMovieApi = async () => {
        // if API link is empty -> show warning alert
        if (!api) return toast({ title:"Thông báo" , description: "Vui lòng điền link api!", variant:"destructive"});
        // validate API link format

        setIsCallApi(true);

        // call API to fetch movie data
        const movieData = await request(api);
        
        if(movieData){
            // handleAutoFillMovieData(movieData, updateState, optionState);
            setIsDataUpdated(true);
        }
        setIsCallApi(false);
    };

    // function to handle movie creation
    const handleCreateMovie = async () => {
    };
    
    return (
        <>
            {/* input section to fetch movie data via API */}
            <div className="row-auto h-full border-2 rounded-lg p-4">
                <div className="col-8 mb-4">
                    <label htmlFor="api" className="block mb-2 text-[12px] sm:text-[16px] 3xl:text-[23px] font-bold uppercase">{trans("auto_fetch.title")}</label>
                    <input onChange={(e) => setApi(e.target.value)} 
                        type="text" id="api" 
                        className="text-[10px] sm:text-[14px] 3xl:text-[20px] p-[6px] sm:p-[8px] 3xl:p-[12px] rounded-lg w-full border" 
                        placeholder="https://phimapi.com/phim" required 
                    />
                </div>
                <div className="col-4 items-center flex gap-5">
                    <Button disabled={isCallApi?true:false} onClick={handleCallMovieApi} variant="outline" className="rounded-lg text-md flex items-center gap-1 font-md text-[8px] lg:text-[12px] 3xl:text-[20px] px-[8px] sm:px-[12px] py-2">
                        <Download />{trans("auto_fetch.button")}
                    </Button>
                    {/* Show loading spinner during API call */}
                    {isCallApi && <CustomPending />}
                </div>
            </div>

            {/* Content section with movie form (left) and episode list (right) */}
            <div className="grid grid-cols-3 gap-2 my-6">
                <MultiSelect frameworks={data?.categories} selected={catSelected} setSelected={setCatSelected} placeholder={trans("category.placeholder")}/>
                <MultiSelect frameworks={data?.countries} selected={ctrSelected} setSelected={setCtrSelected} placeholder={trans("country.placeholder")}/>
                <MultiSelect frameworks={data?.actors} selected={actorSelected} setSelected={setActorSelected} placeholder={trans("actor.placeholder")}/>
                <MultiSelect frameworks={data?.directors} selected={directorSelected} setSelected={setDirectorSelected} placeholder={trans("director.placeholder")}/>
                <SelectComponent title={trans('year.title')} name="year" data={data?.years} value={state.year}/>

                {/* Left side: Movie form inputs */}
                <FormCreateMovie data={data} />
                
                {/* Right side: Episode management */}
                {/* <ListEpisode listEp={listEp} setListEp={setListEp} title="EPISODE" /> */}
            </div>

            {/* Button to create a new movie */}
            <div className="col-4 mb-4 flex gap-5">
                <Button disabled={isCreating?true:false} onClick={handleCreateMovie} variant="outline" color='green' className="rounded-lg text-md flex items-center gap-1 font-md text-[8px] lg:text-[12px] 3xl:text-[20px] px-3 py-2">
                    <Plus />Tạo phim
                </Button>
                {isCreating && <div className='loading w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]  3xl:w-[45px] 3xl:h-[45px]'></div>}
            </div>
        </>
    );
}
