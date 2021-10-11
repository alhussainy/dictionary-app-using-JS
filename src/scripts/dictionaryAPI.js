const fetchAPI = async  (word) => {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const res = fetch(url + word)
        .then(res => res.json())
        .then(result => { return result });
    return res;
    
}
export { fetchAPI };