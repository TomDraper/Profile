import { BasicParagraphSection } from './textHelpers';

import '../css/tagFilter.css';

export interface Taggable {
    tags: Set<string>;
}

export function TagBox({prop}:{prop:Taggable}){
    return (
        <div className="tagBox">
            <BasicParagraphSection paragraphs={Array.from(prop.tags)} />
        </div>
    );
}

export function FilterByTags<T extends Taggable>(items: T[], filter: Set<string>): T[] {
    if (filter.size === 0) return items;

    return items.filter(item =>
        Array.from(filter).every(tag => item.tags.has(tag))
    );
}

export function TagFilter({tags, filter, setFilter}:{tags:Set<string>, filter:Set<string>, setFilter:Function}){
    return (
        <div>
            <FilterBox currentFilter={filter} setFilterFunc={setFilter} />
            <div className="tagFilter">
                <Options options={Array.from(tags)} currentFilter={filter} setFilterFunc={setFilter} />
            </div>
        </div>
    );
}

function FilterBox({currentFilter, setFilterFunc}:{currentFilter:Set<string>, setFilterFunc:Function}){
    return (
        <div className="tagFilterBox">
            <FilterBoxTags currentFilter={currentFilter} setFilterFunc={setFilterFunc} />
        </div>
    );
}

function FilterBoxTags({currentFilter, setFilterFunc}:{currentFilter:Set<string>, setFilterFunc:Function}){
    var arr = Array.from(currentFilter);
    return arr.map((prop, index)=>
        <FilterBoxTag key={index} currentFilter={currentFilter} setFilterFunc={setFilterFunc} tag={prop} />
    );
}

function FilterBoxTag({currentFilter, setFilterFunc, tag}:{currentFilter:Set<string>, setFilterFunc:Function, tag:string}){
    return (
        <div className="tagFilterBoxButton">
            <input className="tagFilterBoxButtonText" type="button" value={tag} onClick={()=>ToggleTag(currentFilter, setFilterFunc, tag)}></input>
            <input className="tagFilterBoxButtonX" type="button" value="X" onClick={()=>ToggleTag(currentFilter, setFilterFunc, tag)}></input>
        </div>
    );
}

function ToggleTag(currentFilter:Set<string>, setFilterFunc:Function, tag:string){
    let next = new Set(currentFilter);

    if (next.has(tag)){
        next.delete(tag);
    } else {
        next.add(tag);
    }

    setFilterFunc(next);
}

function Options({options, currentFilter, setFilterFunc}:{options:string[], currentFilter:Set<string>, setFilterFunc:Function}){
    return (
        <div>
            <select className="tagFilterSelector" id="FilterSelect" onChange={(e)=>ToggleTag(currentFilter, setFilterFunc, e.target.value)}>
                <GetOptions options={options} currentFilter={currentFilter} setFilterFunc={setFilterFunc}/>
            </select>
        </div>
    );
    return options.map((prop, index)=>
        <div key={index} className="tagFilterOption">
            <label>{prop}</label>
            <input type="checkbox" checked={currentFilter.has(prop)} onChange={()=>ToggleTag(currentFilter, setFilterFunc, prop)}></input>
        </div>
    );
}
function GetOptions({options, currentFilter, setFilterFunc}:{options:string[], currentFilter:Set<string>, setFilterFunc:Function}){
    let optionsWithNoneAdded = Array.from(options);
    optionsWithNoneAdded.unshift("Add Filter");
    return optionsWithNoneAdded.map((prop, index)=>
        currentFilter.has(prop) ? 
            "" :
            <option key={index} value={prop}>{prop}</option>
    );
}
