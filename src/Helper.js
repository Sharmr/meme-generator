export const populateForm = (oldData, box_count) => {

    let f = {...oldData};
    for(let i = 0; i < box_count; i++) {
        let key = `Text ${i+1}`;
        //if(key in f) {} else {
            f = {...f, [key]: ""};
        //}
    }
    return f;
}; 
