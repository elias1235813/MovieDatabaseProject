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
        <section className="muuttuva-otsikko" aria-label={otsikointi}>
            <h2>{otsikointi}</h2>
            {searchQuery && (
                <button type="button" className="btn-close" onClick={onClearSearch} aria-label="Tyhjennä haku">
                
                </button>
            )}
        </section>
    );
};

export default Otsikko;
