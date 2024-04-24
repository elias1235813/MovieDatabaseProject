import React from "react";

function Otsikko ({searchQuery = '', onClearSearch}){
    console.log('searchQuery:', searchQuery); 
    let otsikointi;

    if (searchQuery.trim() !== ''){
        otsikointi = `Kaikki elokuvat ${searchQuery}-kategoriassa`;
    }
    else {
        otsikointi = 'Elokuvat';
    }


return ( 
    <section className="muuttuva-otsikko">
    <h2>{otsikointi}</h2> {searchQuery && (<button type="button" class="btn-close" onClick={onClearSearch} aria-label="Close" ></button>
    )}
    </section>
    
    
)
};

export default Otsikko