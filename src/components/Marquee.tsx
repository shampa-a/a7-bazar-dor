import React from 'react';

const Marquee = async() => {
    const res= await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    const data= await res.json();
    const headlines=data.data;
    console.log(headlines);
    
    return (
        <div>
            
<div className="flex flex-wrap gap-4">
  {headlines.map((headline) => (
    <span key={headline.title} className="whitespace-nowrap">
      {headline.title}
    </span>
  ))}
</div>

        </div>
    );
};

export default Marquee;